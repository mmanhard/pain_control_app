import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: 'auto',
    width: 400,
    height: 425,
    fontSize: AppFonts.size.xSmall,
    color: AppColors.lightGrey,
    ...AppStyles.typContentContainer
  },
  okBtn: {
    addStyles: {
      alignSelf: 'center',
      ...AppStyles.largeBtn,
    },
    ...AppStyles.activeBtn
  },
}