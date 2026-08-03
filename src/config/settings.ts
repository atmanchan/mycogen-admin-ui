export interface BackgroundSettingsConfig {
  enabled: boolean
  showMesh: boolean
  showSolid: boolean
  showPresetGallery: boolean
  maxBlobs: number
}

export interface SettingsConfig {
  showBorderRadius: boolean
  showButtonColor: boolean
  showBackground: BackgroundSettingsConfig
  showCardStyle: boolean
}

export const defaultSettingsConfig: SettingsConfig = {
  showBorderRadius: true,
  showButtonColor: true,
  showBackground: {
    enabled: true,
    showMesh: true,
    showSolid: true,
    showPresetGallery: true,
    maxBlobs: 6,
  },
  showCardStyle: true,
}
