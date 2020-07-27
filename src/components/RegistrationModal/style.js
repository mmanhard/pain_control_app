import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: (isMobile) => {
    return {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      width: isMobile ? '85%' : 400,
      height: 425,
      fontSize: AppFonts.size.xSmall,
      color: AppColors.lightGrey,
      ...AppStyles.typContentContainer
    }
  },
  formContainer: (flashVisible) => {
    return {
      flex: 1,
      ...AppStyles.center,
    };
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 30,
    width: '80%',
    ...AppStyles.rowStart,
    borderBottom: `1px solid ${AppColors.blue}`
  },
  txtInput: {
    ...AppFonts.Raleway.bold,
    flex: 1,
    width: 10,
    paddingLeft: 10,
    border: 'none',
    backgroundColor: 'transparent',
  },
  registerBtn: {
    addStyles: AppStyles.largeBtn,
    ...AppStyles.activeBtn
  },
  flashMessage: (isSmallScreen) => {
    return {
      width: '90%',
      marginTop: 10,
      height: 80,
      borderRadius: 20,
      backgroundColor: AppColors.flashRed,
      alignSelf: 'center',
      ...AppStyles.center,
      ...AppFonts.Raleway.bold,
      fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
      color: AppColors.flashRedTxt
    };
  },
}