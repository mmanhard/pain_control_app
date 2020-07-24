import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

export default {
  container: {
    ...AppStyles.fill,
    bottom: 0,
    ...AppStyles.center,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  contentContainer: {
    backgroundColor: AppColors.white,
    height: 250,
    width: 300,
    borderRadius: 20,
    border: `solid 8px ${AppColors.blue}`,
    boxShadow: AppStyles.typBoxShadow,
    ...AppStyles.center
  }
}