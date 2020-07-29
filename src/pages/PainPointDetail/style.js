import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
  container: (isSmallScreen) => {
    return {
      ...AppStyles.fill,
      padding: isSmallScreen ? '80px 0px 0px 0px' : '110px 30px 30px 30px',
    }
  },
  contentContainer: (isSmallScreen) => {
    return {
      height: '100%',
      width: '100%',
      ...AppStyles.columnStart,
    }
  },
  configContainer: (isSmallScreen) => {
    const flexStyle = isSmallScreen ? AppStyles.columnStart : AppStyles.rowSpace;
    return {
      width: '100%',
      height: 160,
      marginBottom: isSmallScreen ? 0 : 30,
      ...flexStyle,
    }
  },
  titleContainer: (isSmallScreen) => {
    return {
      height: isSmallScreen ? 75 : '100%',
      width: isSmallScreen ? '100%' : 400,
      backgroundColor: isSmallScreen ? AppColors.white : AppColors.blue,
      ...AppFonts.Raleway.bold,
      color: isSmallScreen ? AppColors.blue : AppColors.white,
      textAlign: 'center',
      marginRight: isSmallScreen ? 0 : 30,
      ...AppStyles.rowSpace,
      alignItems: 'center'
    }
  },
  titleTxt: (isSmallScreen) => {
    return {
      margin: 10,
      fontSize: isSmallScreen ? AppFonts.size.large : AppFonts.size.xxLarge,
      textAlign: 'center',
      flex: 1,
    }
  },
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: (isSmallScreen) => {
    const controlHeight = isSmallScreen ? {} : {height: '100%'};
    const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      flex: 1,
      width: '100%',
      minWidth: isSmallScreen ? 0 : 450,
      ...controlHeight,
      ...contentContainer,
      ...AppStyles.rowSpace,
      alignItems: 'center',
    };
  },
  toggleTxtContainer: (isMobile) => {
    return {
      height: isMobile ? 50 : 70,
      maxWidth: 120,
      borderRadius: 20,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
      fontSize: isMobile ? AppFonts.size.small : AppFonts.size.medium,
      marginLeft: 20,
      padding: 10,
      ...AppStyles.center,
      alignItems: 'start',
      textAlign: 'center'
    }
  },
  mainButton: (isMobile, isSmallScreen) => {
    return {
      addStyles: {
        ...AppFonts.Raleway.bold,
        fontSize: isMobile ? AppFonts.size.small : AppFonts.size.medium,
        border: 'none',
        boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
        height: isSmallScreen ? 50 : 60,
        width: isSmallScreen ? 120 : 180,
        borderRadius: isSmallScreen ? 25 : 30,
        margin: 8,
      },
      ...AppStyles.activeBtn
    }
  },
  mainButtonInactive: (isMobile, isSmallScreen) => {
    return {
      addStyles: {
        ...AppFonts.Raleway.bold,
        fontSize: isMobile ? AppFonts.size.small : AppFonts.size.medium,
        border: 'none',
        boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
        height: isSmallScreen ? 50 : 60,
        width: isSmallScreen ? 120 : 180,
        borderRadius: isSmallScreen ? 25 : 30,
        margin: 4,
      },
      ...AppStyles.inactiveBtn
    }
  },
  mainContentContainer: (isSmallScreen, isMediumScreen) => {
    const flexStyle = isSmallScreen ? AppStyles.columnStart : AppStyles.rowSpace;
    const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      ...contentContainer,
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      ...flexStyle
    }
  },
  graphContainer: (isSmallScreen) => {
    return {
      ...AppStyles.center,
      position: 'relative',
      marginTop: isSmallScreen ? 10 : 20,
      marginLeft: isSmallScreen ? 0 : 20,
    }
  },
  graphTitle: {
    backgroundColor: AppColors.blue,
    color: AppColors.white,
    fontSize: AppFonts.size.large,
    position: 'relative',
    left: '5%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    height: 48,
    borderRadius: 30,
    marginBottom: 20,
  },
  graph: {
    backgroundColor: AppColors.white,
    overflow: 'visible'
  },
  graphHeight: (isMobile, isSmallScreen) => {
    return (isMobile
      ? 300
      : (isSmallScreen ? 375 : 400));
  },
  filterContainer: (isMobile, isSmallScreen, customStartDate) => {
    const flexStyle = (!isMobile && isSmallScreen) ? AppStyles.rowSpace : AppStyles.center;
    return {
      ...flexStyle,
      justifyContent: 'space-evenly',
      borderRadius: 20,
      backgroundColor: AppColors.lilac,
      width: (!isMobile && isSmallScreen) ? '80%' : 180,
      margin: 20,
      flexWrap: 'wrap'
    };
  },
  filterTxt: {
    color: AppColors.lightGrey,
    textDecoration: 'underline',
    margin: '14px 8px 8px 8px'
  },
  configTimeTxt: (isSmallScreen) => {
    return {
      background: 'none',
      color: AppColors.black,
      border: 'none',
      textAlign: 'center',
      width: isSmallScreen ? 90 : 120,
      margin: 10,
      paddingBottom: 8,
      borderBottom: `solid 2px ${AppColors.blue}`,
      ...AppFonts.Raleway.bold,
      fontSize: isSmallScreen ? AppFonts.size.medSmall : AppFonts.size.medium,
    }
  },
  filterOptionTxt: {
    height: 36,
    width: 120,
    borderRadius: 18,
    backgroundColor: AppColors.white,
    color: AppColors.blue,
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medium,
    textAlign: 'center',
    border: 'none',
    boxShadow: AppStyles.typBoxShadow,
    alignItems: 'center',
    margin: 20
  },
  filterDateContainer: {
    ...AppStyles.rowCenter,
    justifyContent: 'space-evenly',
    width: '100%'
  },
  filterDate: {
    textDecoration: 'underline'
  },
  submitDateBtn: {
    addStyles: {
      height: 32,
      width: 80,
      borderRadius: 16,
      textAlign: 'center',
      border: 'none',
      ...AppFonts.Raleway.bold,
      marginBottom: 12,
      boxShadow: AppStyles.typBoxShadow
    },
    ...AppStyles.activeBtn
  },
  miniVisualizer: {
    height: 110,
    width: 80,
    border: `solid 4px ${AppColors.blue}`,
    backgroundColor: AppColors.white,
    boxShadow: AppStyles.typBoxShadow,
    borderRadius: 12,
    marginRight: 30,
  },
  flashMessage: (isSmallScreen, flashMessage) => {
    return {
      width: '90%',
      marginTop: 10,
      marginBottom: 10,
      height: flashMessage ? 80 : 0,
      borderRadius: 20,
      backgroundColor: AppColors.flashRed,
      alignSelf: 'center',
      ...AppStyles.center,
      fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
      color: AppColors.flashRedTxt
    };
  },
}