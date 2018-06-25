export interface View {
  aspectHeight?: number;
  aspectWidth?: number;
  size?: number;
  zoom?: boolean;
  zoomPixels?: number;
  height?: number;
  viewerUrl: string;
}

export interface ManifestViews {
  config?: View;
  liveConfig?: View;
  panel?: View;
  videoOverlay?: View;
  mobile?: View;
  component?: View;
}

export interface ExtensionManifest {
  anchor: string;
  asset_urls?: Array<string>;
  author_name: string;
  bits_enabled: boolean;
  can_install: boolean;
  config_url: string;
  description: string;
  eula_tos_url: string;
  icon_url: string;
  icon_urls: Object;
  id: string;
  installation_count: number;
  live_config_url: string;
  name: string;
  panel_height: number;
  privacy_policy_url: string;
  request_identity_link: boolean;
  required_broadcaster_abilities: Array<string>;
  screenshot_urls: Array<string>;
  sku: string;
  state: string;
  summary: string;
  support_email: string;
  vendor_code: string;
  version: string;
  viewer_url?: string;
  viewer_urls?: Object;
  views: ManifestViews;
  whitelisted_config_urls: Array<string>;
  whitelisted_panel_urls: Array<string>;
}
