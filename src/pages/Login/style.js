import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    ...AppStyles.fill,
    bottom: 0,
    ...AppStyles.center,
    alignItems: 'stretch',
    backgroundColor: AppColors.lilac,
    minHeight: 500,
  },
  contentContainer: (isMobile, isSmallScreen) => {
    const mobileFlexStyle = {
      display: 'flex',
      flexDirection: 'column' };
    const flexStyle = isMobile ? mobileFlexStyle : AppStyles.rowSpace;
    const controlWidth = isSmallScreen ? { width: '100%' } : { minWidth: 400 };
    return {
      flex: 1,
      margin: isSmallScreen ? 0 : 80,
      backgroundColor: AppColors.blue,
      boxShadow: AppStyles.typBoxShadow,
      ...controlWidth,
      ...flexStyle
    }
  },
  formContainer: (isMobile) => {
    const contentContainer = isMobile ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: isMobile ? '100%' : 400,
      fontSize: AppFonts.size.xSmall,
      color: AppColors.lightGrey,
      ...contentContainer
    }
  },
  noLoginContainer: {
    margin: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  titleContainer: (isMobile) => {
    return {
      marginLeft: 50,
      marginTop: isMobile ? 0 : 50,
      flex: 1
    }
  },
  titleTxt: {
    margin: 0,
    ...AppFonts.Raleway.bold,
    color: AppColors.white,
    fontSize: AppFonts.size.xxLarge
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
      fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
      color: AppColors.flashRedTxt
    };
  },
  loginContainer: (isShortScreen, flashVisible) => {
    const controlPos = (!isShortScreen && flashVisible) ? { position: 'relative', top: -45 } : {};
    return {
      flex: 1,
      position: 'relative',
      ...controlPos,
      ...AppStyles.center
    }
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 30,
    width: '70%',
    ...AppStyles.rowCenter,
    borderBottom: `1px solid ${AppColors.blue}`
  },
  txtInput: {
    ...AppFonts.Raleway.bold,
    flex: 1,
    paddingLeft: 10,
    border: 'none',
    backgroundColor: 'transparent',
  },
  loginBtn: {
    addStyles: AppStyles.largeBtn,
    ...AppStyles.activeBtn
  },
  registerBtn: {
    addStyles: AppStyles.largeBtn,
    ...AppStyles.inactiveBtn
  }
}