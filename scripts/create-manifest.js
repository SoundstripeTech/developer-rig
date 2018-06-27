// Load requirements.
const fs = require("fs");
const cli = require("command-line-args");

// Intialize and load command line parameters.
const now = new Date() | 0;
const types = ["panel", "video_overlay", "video_component"];
const stdout = "standard output";
const options = [
  { name: "type", alias: "t", type: String, description: `type of extension, one of ${types.join(", ")}` },
  { name: "panel_height", alias: "p", type: Number, defaultValue: 300, description: "height of panel extension" },
  { name: "component_size", alias: "c", type: String, defaultValue: "30%x40%", description: "size of video component extension, width by height" },
  { name: "base_uri", alias: "b", type: String, defaultValue: "https://localhost.rig.twitch.tv:8080", description: "testing base URI of extension assets" },
  { name: "author_name", alias: "a", type: String, defaultValue: "twitchrig", description: "extension author name" },
  { name: "support_email", alias: "e", type: String, defaultValue: "support@localhost", description: "extension support email" },
  { name: "name", alias: "n", type: String, defaultValue: `Extension ${now}`, description: "extension name" },
  { name: "description", alias: "d", type: String, defaultValue: `Description of extension ${now}.`, description: "extension description" },
  { name: "summary", alias: "m", type: String, defaultValue: `Summary of extension ${now}.`, description: "extension summary" },
  { name: "output_file", alias: "o", type: String, defaultValue: stdout, description: "output file path" },
  { name: "help", alias: "h", type: Boolean, description: "this help text" },
];
const args = cli(options);

// Validate command line parameters.
const type = args.type;
const componentSize = extractSize(args.component_size);
const panelHeight = extractExtent(args.panel_height);
if (args.help || !componentSize || !panelHeight || !types.some(choice => choice === type)) {
  const scriptName = process.argv[1].split(require("path").sep).pop();
  console.log(`Usage: node ${scriptName} -t {${types.join(",")}} [other options]`);
  console.log();
  options.forEach(option => {
    const defaultValue = option.defaultValue !== undefined ? ` (default ${JSON.stringify(option.defaultValue)})` : "";
    console.log(`  -${option.alias}  ${option.description}${defaultValue}`);
  });
  console.log();
  console.log("The height of a panel extension must be between 100 and 500.  The width of a\n" +
    "video component extension must be between 1.00% and 50.00%.  The height of a\n" +
    "video component extension must be between 1.00% and 100.00%.");
  process.exit(args.help ? 0 : 2);
}

// Generate and print the manifest.
const manifest = generateManifest();
const outputFile = args.output_file;
if (outputFile === stdout) {
  console.log(manifest);
} else {
  const fd = fs.openSync(outputFile, "w");
  fs.writeSync(fd, JSON.stringify(manifest));
}

function extractSize(arg) {
  const ar = arg.split("x");
  if (ar.length === 2) {
    const width = extractValue(ar[0]);
    const height = extractValue(ar[1]);
    if (width >= 100 && width <= 5000 && height >= 100 && height <= 10000) {
      return { width, height };
    }
  }

  function extractValue(value) {
    return Math.round(parseFloat(value.split("%")[0], 10) * 100);
  }
}

function extractExtent(arg) {
  const extent = Math.round(arg);
  if (extent >= 100 && extent <= 500) {
    return extent;
  }
}

function generateManifest() {
  const baseUri = args.base_uri;
  const viewerUrl = `${baseUri}/${type}.html`;
  const viewKey = type === "video_component" ? "component" : type;
  return {
    id: "u0000000000000000000" + now,
    state: "Testing",
    version: "0.0.1",
    anchor: "",
    panel_height: type === "panel" ? panelHeight : 0,
    author_name: args.author_name,
    support_email: args.support_email,
    name: args.name,
    description: args.description,
    summary: args.summary,
    viewer_url: type === "panel" ? viewerUrl : "",
    viewer_urls: { [viewKey]: viewerUrl },
    views: {
      [viewKey]: getView(),
      config: { viewer_url: `${baseUri}/config.html` }
    },
    config_url: `${baseUri}/config.html`,
    live_config_url: `${baseUri}/live_config.html`,
    icon_url: "https://media.forgecdn.net/avatars/158/128/636650453584584748.png",
    icon_urls: { "100x100": "https://media.forgecdn.net/avatars/158/128/636650453584584748.png" },
    screenshot_urls: ["internal/screenshots/test_data.png"],
    asset_urls: null,
    installation_count: -42,
    can_install: true,
    whitelisted_panel_urls: [],
    whitelisted_config_urls: [],
    required_broadcaster_abilities: [],
    eula_tos_url: "",
    privacy_policy_url: "",
    request_identity_link: false,
    vendor_code: "",
    sku: "",
    bits_enabled: false
  };

  function getView() {
    switch (type) {
      case "panel":
        return {
          viewer_url: viewerUrl,
          height: panelHeight,
        };
      case "video_overlay":
        return {
          viewer_url: viewerUrl,
        };
      case "video_component":
        return {
          viewer_url: viewerUrl,
          aspect_width: componentSize.width,
          aspect_height: componentSize.height,
          componentSize: 0,
          zoom: true,
          zoom_pixels: 1024,
        };
    }
  }
}