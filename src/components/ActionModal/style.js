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
    width: 300,
    height: 200,
    ...AppStyles.typContentContainer
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    ...AppStyles.columnSpace
  },
  btnContainer: {
    ...AppStyles.rowSpace,
    width: '100%'
  },
  okBtn: {
    addStyles: {
      ...AppStyles.largeBtn,
    },
    ...AppStyles.activeBtn
  },
  cancelBtn: {
    addStyles: {
      ...AppStyles.largeBtn,
    },
    ...AppStyles.inactiveBtn
  },
}