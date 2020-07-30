import AppColors from 'Common/AppColors';
import AppFonts from 'Common/AppFonts';
import AppStyles from 'Common/AppStyles';

export default {
  yLabelContainer: (height) => {
    return {
      ...AppStyles.center,
      height: (height-66),
      alignSelf: 'flex-start'
    }
  },
  yLabel: {
    width: 30,
    borderRadius: 20,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 10,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
    writingMode: 'vertical-rl',
    textOrientation: 'sideways',
  },
  noDataContainer: (height, width) => {
    return {
      position: 'absolute',
      top: height < 350 ? 0.2*height : 0.4*height,
      left: 0.3*width,
      height: 0.35*height,
      width: 0.5*width,
      marginBottom: 20,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
      ...AppStyles.center,
      textAlign: 'center',
      fontSize: width < 450 ? AppFonts.size.medium : AppFonts.size.medLarge,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
    }
  },
}