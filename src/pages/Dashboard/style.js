import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: (isSmallScreen) => {
      return {
        ...AppStyles.fill,
        bottom: 0,
        padding: isSmallScreen ? '80px 0px 0px 0px' : '110px 30px 30px 30px',
      };
    },
    contentContainer: (isSmallScreen) => {
      const flexStyle = isSmallScreen ? AppStyles.columnStart : AppStyles.rowCenter;
      return {
        width: '100%',
        ...flexStyle,
        alignItems: 'flex-start',
      };
    },
    leftContentContainer: (isSmallScreen) => {
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        flex: 1,
        minWidth: isSmallScreen ? 0 : 580,
        width: '100%',
        ...contentContainer,
        ...AppStyles.columnStart,
      };
    },
    titleContainer: (isSmallScreen) => {
      return {
        ...AppStyles.center,
        alignItems: 'flex-start',
        backgroundColor: AppColors.blue,
        height: isSmallScreen ? 80 : 110,
        minWidth: isSmallScreen ? 160 : 200,
        marginLeft: isSmallScreen ? 12 : 20,
        paddingLeft: 10,
        paddingRight: 10,
        ...AppFonts.Raleway.regular,
        fontSize: isSmallScreen ? AppFonts.size.large : AppFonts.size.xxLarge,
        color: AppColors.white,
        borderRadius: 20,
        boxShadow: AppStyles.typBoxShadow
      };
    },
    helpBtn: {
      addStyles: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 20,
        ...AppStyles.center
      },
      ...AppStyles.insetBtn
    },
    helpIcon: {
      height: 24,
      width: 24,
      borderRadius: 14,
      border: `solid 2px ${AppColors.blue}`,
      color: AppColors.blue,
      ...AppStyles.center,
    },
    filterContainer: (isSmallScreen) => {
      return {
        ...AppStyles.center,
        justifyContent: 'space-evenly',
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: AppColors.lilac,
        width: 180,
      };
    },
    filterTxt: {
      color: AppColors.lightGrey,
      textDecoration: 'underline',
      margin: 8,
    },
    configTimeTxt: {
      background: 'none',
      color: AppColors.black,
      border: 'none',
      textAlign: 'center',
      width: 120,
      margin: 10,
      paddingBottom: 8,
      borderBottom: `solid 2px ${AppColors.blue}`,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
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
      margin: 8,
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
        ...AppFonts.Raleway.bold,
        marginBottom: 12,
        boxShadow: AppStyles.typBoxShadow,
      },
      ...AppStyles.activeBtn
    },
    visualizer: (isSmallScreen, isMediumScreen, isShortScreen, isMidHeightScreen) => {
      return {
        backgroundColor: AppColors.white,
        border: `solid 8px ${AppColors.blue}`,
        boxShadow: AppStyles.typBoxShadow,
        borderRadius: 40,
        height: isMidHeightScreen ? (isShortScreen ? 250 : 300) : 400,
        width: isMediumScreen ? (isSmallScreen ? 150 : 225) : 300,
        marginBottom: isMidHeightScreen ? (isShortScreen ? 10 : 0) : 30,
      }
    },
    painLegend: {
      ...AppStyles.rowStart,
      ...AppStyles.typContentContainer,
      alignItems: 'center',
      maxWidth: 600,
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      height: 100,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.blue,
    },
    rightContentContainer: (isSmallScreen) => {
      return {
        flex: 1,
        marginLeft: 30,
        ...AppStyles.columnStart
      };
    },
    mainStatsContainer: (isMediumScreen) => {
      const contentContainer = isMediumScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        ...contentContainer,
        flex: 1,
        width: '100%',
        ...AppStyles.columnStart
      };
    },
    basicStatsContainer: {
      ...AppStyles.rowSpace,
      alignItems: 'center',
      backgroundColor: AppColors.lilac,
      height: 90,
      width: 225,
      padding: 10,
      borderRadius: 20,
    },
    statsContainer: (isSmallScreen) => {
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        ...AppStyles.center,
        ...contentContainer,
        flex: 1,
        width: '90%',
        marginTop: isSmallScreen ? 10 : 30,
        marginBottom: 20,
      }
    },
    statsRow: (isSmallScreen) => {
      return {
        ...AppStyles.rowStart,
        paddingLeft: isSmallScreen ? 0 : 30,
        alignItems: 'center',
        flex: 1,
        width: '95%',
        marginTop: 10,
      }
    },
    generalStatsContainer: {
      ...AppStyles.rowStart,
      flexWrap: 'wrap',
      alignContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      width: '95%',
      marginTop: 10,
      padding: 0,
    },
    subtitleContainer: {
      ...AppStyles.center,
      backgroundColor: AppColors.lilac,
      height: 60,
      width: '25%',
      borderRadius: 20,
      color: AppColors.blue,
    },
    statContainer: {
      ...AppStyles.center,
      width: '25%',
      textAlign: 'center',
    },
    statTxtBtn: (isMobile) => {
      return {
        addStyles: {
          ...AppStyles.center,
          ...AppFonts.Raleway.bold,
          fontSize: isMobile ? AppFonts.size.medSmall : AppFonts.size.medium,
          height: isMobile ? 48 : 60,
          width: isMobile ? 48 : 60,
          borderRadius: isMobile ? 24 : 30,
          boxShadow: AppStyles.typBoxShadow,
        },
        ...AppStyles.activeBtn
      }
    },
    statTxt: (isMobile) => {
      return {
        ...AppStyles.center,
        fontSize: isMobile ? AppFonts.size.medSmall : AppFonts.size.medium,
        backgroundColor: AppColors.blue,
        height: isMobile ? 48 : 60,
        width: isMobile ? 48 : 60,
        borderRadius: isMobile ? 24 : 30,
        color: AppColors.white
      }
    },
    statTitle: {
      marginTop: 8,
      color: AppColors.blue,
      fontSize: AppFonts.size.medSmall,
    },
    noPartsText: {
      ...AppStyles.center,
      textAlign: 'center',
      backgroundColor: AppColors.lilac,
      height: 140,
      width: 250,
      padding: 10,
      margin: 30,
      borderRadius: 20,
    },
    mainButtonContainer: (isMediumScreen) => {
      const contentContainer = isMediumScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        ...contentContainer,
        height: isMediumScreen ? 80 : 120,
        width: '100%',
        marginTop: isMediumScreen ? 0 : 20,
        ...AppStyles.rowSpace,
        alignItems: 'center'
      }
    },
    mainButtonInactive: (isMobile) => {
      return {
        addStyles: {
          ...AppFonts.Raleway.bold,
          fontSize: isMobile ? AppFonts.size.medSmall : AppFonts.size.medLarge,
          boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
          height: isMobile ? 50 : 60,
          width: isMobile ? 120 :180,
          borderRadius: isMobile ? 25 : 30,
          margin: 10,
        },
        ...AppStyles.inactiveBtn
      }
    },
    mainButton: (isMobile) => {
      return {
        addStyles: {
          ...AppFonts.Raleway.bold,
          fontSize: isMobile ? AppFonts.size.medSmall : AppFonts.size.medLarge,
          boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
          height: isMobile ? 50 : 60,
          width: isMobile ? 120 :180,
          borderRadius: isMobile ? 25 : 30,
          margin: 10,
        },
        ...AppStyles.activeBtn
      }
    },
    actionModalTxt: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.black,
      marginTop: 30,
      textAlign: 'center',
      width: '80%'
    },
    flashMessage: (isSmallScreen, flashMessage, flashSuccess) => {
      return {
        width: '90%',
        margin: isSmallScreen ? '0 0 20px 0' : 20,
        height: flashMessage ? 80 : 0,
        borderRadius: 20,
        backgroundColor: flashSuccess ? AppColors.flashGreen : AppColors.flashRed,
        alignSelf: 'center',
        ...AppStyles.center,
        fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
        color: flashSuccess ? AppColors.flashGreenTxt : AppColors.flashRedTxt
      };
    },
}