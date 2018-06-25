const {execFile} = require('child_process');
const path = require('path');

const optionDefinitions = [
  { name: "account", alias: "a", type: String, defaultValue: "twitchdev"},
  { name: "repo", alias: "r", type: String, defaultValue: "extensions-hello-world"},
  { name: "local_dir", alias: "l", type: String },
  { name: "help", alias: "h" },
]

function usageAndExit() {
  console.log("Usage: node extension-init.js -a [github_account] -r [github_repo] -l [local_dir]")
  process.exit(0)
}

if (require.main === module) {
  const cli = require("command-line-args");
  const args = cli(optionDefinitions);
  if (args["local_dir"] === undefined || "help" in args) {
    usageAndExit();
  }

  const extensionRepo = "https://github.com/" + args["account"] + "/" + args["repo"] + ".git"

  let error;

  execFile("git",["clone", extensionRepo, path.resolve(args["local_dir"])],(err,stdout,stderr)=>{
    if(err){
      console.log("ERROR: You may need to remove the local directory specified before re running.");
      console.log(err);    
    }else{
      console.log("Finished cloning " + extensionRepo + "@master into local directory "+ args["local_dir"])
    }
  })
}
