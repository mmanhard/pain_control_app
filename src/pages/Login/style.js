import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    ...AppStyles.fill,
    ...AppStyles.center,
    alignItems: 'stretch',
    backgroundColor: AppColors.lilac,
  },
  contentContainer: (isMobile, isSmallScreen) => {
    const mobileFlexStyle = {
      display: 'flex',
      flexDirection: 'column' };
    const flexStyle = isMobile ? mobileFlexStyle : AppStyles.rowSpace;
    return {
      flex: 1,
      margin: isSmallScreen ? 0 : 80,
      backgroundColor: AppColors.blue,
      boxShadow: AppStyles.typBoxShadow,
      minHeight: 350,
      minWidth: 400,
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
  loginContainer: {
    flex: 1,
    padding: '20px 80px 50px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.blue,
    color: AppColors.white,
  },
  registerBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
  }
}