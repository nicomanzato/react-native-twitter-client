import {StyleSheet} from 'react-native'
import base from '../base.styles.js'

export const styles = StyleSheet.create({
  activityIndicatorContainer:{
    backgroundColor: base.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  timeline: {
    flex:1,
    backgroundColor: base.colors.backgroundPrimary,
    paddingTop: base.spacings.L
  },
});
