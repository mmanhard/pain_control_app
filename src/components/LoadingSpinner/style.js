import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

export default {
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    ...AppStyles.columnStart,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    position: 'relative',
    top: 200,
    backgroundColor: AppColors.white,
    height: 250,
    width: 300,
    borderRadius: 20,
    border: `solid 8px ${AppColors.blue}`,
    boxShadow: AppStyles.typBoxShadow,
    ...AppStyles.center
  }
}