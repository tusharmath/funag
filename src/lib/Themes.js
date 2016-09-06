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

export const Palette = {
  bg__artwork: '#F6F6F6',
  bg__artworkPlayingIcon: PrimaryDarkTextColor,
  bg__control: '#EEE',
  bg__header: '#EEE',
  bg__scrobberIcon: '#2196F3',
  bg__scrobberTrack: 'rgb(255, 0, 0)',
  bg__search: '#EEE',
  bg__tabsNavBar: '#EEE',
  bg__tabsNavBarSlider: 'rgb(134, 134, 134)',
  br__playlistItem: '1px solid rgb(249, 246, 246)',
  fg__artwork: LightTextColor,
  fg__control: PrimaryDarkTextColor,
  fg__header: PrimaryDarkTextColor,
  fg__header__light: LightTextColor,
  fg__playbackInfo__light: LightTextColor,
  fg__search: PrimaryDarkTextColor,
  fg__tabsNavBar: 'rgb(134, 134, 134)',
  fg__tabsNavBar__active: PrimaryDarkTextColor,
  fg__trackDetail: PrimaryDarkTextColor,
  fg__trackDetail__light: LightTextColor,
  zDepth__0: 'none !important',
  zDepth__1: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
  zDepth__2: '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  zDepth__3: '0 12px 15px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)',
  zDepth__4: '0 16px 28px 0 rgba(0,0,0,0.22),0 25px 55px 0 rgba(0,0,0,0.21)',
  zDepth__5: '0 27px 24px 0 rgba(0,0,0,0.2),0 40px 77px 0 rgba(0,0,0,0.22)'
}

export const BlockHeight = 50
export const BlockSpace = 6
export const ScrobberHeight = 2
