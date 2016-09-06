/**
 * @NOTE Place to define all the colors
 * Colors should should only be described at one place,
 * this makes it easier to change later.
 * Naming should follow BEM style (http://getbem.com/naming)
 * SAMPLE NAME : {BLOCK__ELEMENT__MODIFIER}
 * BLOCKS — fg: foreground color, bg: background color,
 * br: border color, zDepth: shadow
 */

const PrimaryDarkTextColor = 'rgb(34, 34, 34)'
const LightTextColor = 'rgb(172, 172, 172)'
export const CSSVariables = {
  '--bg__artwork': '#F6F6F6',
  '--bg__artworkPlayingIcon': PrimaryDarkTextColor,
  '--bg__control': '#EEE',
  '--bg__header': '#EEE',
  '--bg__scrobberIcon': '#2196F3',
  '--bg__scrobberTrack': 'rgb(255, 0, 0)',
  '--bg__search': '#EEE',
  '--bg__tabsNavBarSlider': 'rgb(134, 134, 134)',
  '--br__playlistItem': '1px solid rgb(249, 246, 246)',
  '--fg__artwork': LightTextColor,
  '--fg__header': PrimaryDarkTextColor,
  '--fg__header__light': LightTextColor,
  '--fg__playbackInfo__light': LightTextColor,
  '--fg__search': PrimaryDarkTextColor,
  '--fg__tabsNavBar': 'rgb(134, 134, 134)',
  '--fg__tabsNavBar__active': PrimaryDarkTextColor,
  '--fg__trackDetail': PrimaryDarkTextColor,
  '--fg__trackDetail__light': LightTextColor,
  '--fg__control': PrimaryDarkTextColor,
  '--zDepth__0': 'none !important',
  '--zDepth__1': '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
  '--zDepth__2': '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  '--zDepth__3': [
    '0 12px 15px 0 rgba(0,0,0,0.24)',
    '0 17px 50px 0 rgba(0,0,0,0.19)'
  ],
  '--zDepth__4': [
    '0 16px 28px 0 rgba(0,0,0,0.22)',
    '0 25px 55px 0 rgba(0,0,0,0.21)'
  ].join(),
  '--zDepth__5': '0 27px 24px 0 rgba(0,0,0,0.2),0 40px 77px 0 rgba(0,0,0,0.22)'
}
export const Palette = {
  bg__artwork: 'var(--bg__artwork)',
  bg__artworkPlayingIcon: 'var(--bg__artworkPlayingIcon)',
  bg__control: 'var(--bg__control)',
  bg__header: 'var(--bg__header)',
  bg__scrobberIcon: 'var(--bg__scrobberIcon)',
  bg__scrobberTrack: 'var(--bg__scrobberTrack)',
  bg__search: 'var(--bg__search)',
  bg__tabsNavBarSlider: 'var(--bg__tabsNavBarSlider)',
  br__playlistItem: 'var(--br__playlistItem)',
  fg__artwork: 'var(--fg__artwork)',
  fg__header: 'var(--fg__header)',
  fg__header__light: 'var(--fg__header__light)',
  fg__playbackInfo__light: 'var(--fg__playbackInfo__light)',
  fg__search: 'var(--fg__search)',
  fg__tabsNavBar: 'var(--fg__tabsNavBar)',
  fg__tabsNavBar__active: 'var(--fg__tabsNavBar__active)',
  fg__trackDetail: 'var(--fg__trackDetail)',
  fg__trackDetail__light: 'var(--fg__trackDetail__light)',
  fg__control: 'var(--fg__control)',
  zDepth__0: 'var(--z-depth__0)',
  zDepth__1: 'var(--z-depth__1)',
  zDepth__2: 'var(--z-depth__2)',
  zDepth__3: 'var(--z-depth__3)',
  zDepth__4: 'var(--z-depth__4)',
  zDepth__5: 'var(--z-depth__5)'
}

export const BlockHeight = 50
export const BlockSpace = 6
