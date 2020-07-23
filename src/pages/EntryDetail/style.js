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
      }
    },
    contentContainer: (isSmallScreen, isMediumScreen) => {
      const flexStyle = isSmallScreen ? AppStyles.columnStart : AppStyles.rowCenter;
      return {
        width: '100%',
        ...flexStyle,
        alignItems: 'flex-start',
      }
    },
    leftContentContainer: (isSmallScreen) => {
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        flex: 1,
        width: '100%',
        ...contentContainer,
        ...AppStyles.columnStart,
      }
    },
    titleRow: (isSmallScreen, isMediumScreen) => {
      const flexStyle = isSmallScreen ? AppStyles.center : AppStyles.rowBetween;
      const controlWidth = isSmallScreen ? {flex: 1} : {width: '100%'}
      return {
        ...flexStyle,
        height: isMediumScreen ? (isSmallScreen ? 180 : 80) : 110,
        ...controlWidth,
        marginTop: isSmallScreen ? 0 : 20
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
      }
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
    filterContaienr: {
      ...AppStyles.center,
      justifyContent: 'space-evenly',
      borderRadius: 20,
      backgroundColor: AppColors.lilac,
      position: 'absolute',
      top: '35%',
      left: '4%',
      width: 180,
      height: '50%',
    },
    filterTxt: {
      color: AppColors.lightGrey,
      textDecoration: 'underline'
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
      alignItems: 'center'
    },
    filterDateContainer: {
      ...AppStyles.rowCenter,
      justifyContent: 'space-evenly',
      width: '100%'
    },
    filterDate: {
      textDecoration: 'underline'
    },
    visualizer: (isSmallScreen, isMediumScreen) => {
      return {
        backgroundColor: AppColors.white,
        border: `solid 8px ${AppColors.blue}`,
        boxShadow: AppStyles.typBoxShadow,
        borderRadius: 40,
        height: isMediumScreen ? (isSmallScreen ? 250 : 350) : 400,
        width: isMediumScreen ? (isSmallScreen ? 150 : 225) : 300,
        marginBottom: isSmallScreen ? 0 : 30,
      }
    },
    painLegend: {
      ...AppStyles.rowStart,
      ...AppStyles.typContentContainer,
      alignItems: 'center',
      maxWidth: 600,
      width: '90%',
      height: 100,
      marginBottom: 30,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.blue,
    },
    painLegendColor: {
      height: 28,
      width: 28,
      borderRadius: 18,
      border: '2px solid black',
    },
    painLegendNumbers:{
      ...AppStyles.rowCenter,
      flex: 1,
    },
    rightContentContainer: (isSmallScreen, isMediumScreen) => {
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        width: '100%',
        ...contentContainer,
        flex: 1,
        marginLeft: 30,
        marginRight: isSmallScreen ? 30 : 0,
        marginBottom: 30,
        minWidth: isMediumScreen ? 0 : 580,
        ...AppStyles.columnStart
      }
    },
    statsContainer: (isSmallScreen) => {
      return {
        ...AppStyles.center,
        marginTop: 30,
        flex: 1,
        width: '95%',
      }
    },
    statsRow: {
      ...AppStyles.rowSpace,
      alignItems: 'center',
      flex: 1,
      width: '100%',
      maxWidth: 500,
      marginTop: 10,
    },
    subtitleContainer: {
      ...AppStyles.center,
      backgroundColor: AppColors.lilac,
      height: 60,
      width: 100,
      borderRadius: 20,
      color: AppColors.blue
    },
    painLevelTxt: (isSmallScreen) => {
      return {
        ...AppStyles.center,
        backgroundColor: AppColors.blue,
        height: 90,
        width: 90,
        borderRadius: 45,
        marginRight: isSmallScreen ? 0 : 30,
        marginTop: isSmallScreen ? 20 : 0,
        color: AppColors.white,
        fontSize: isSmallScreen ? AppFonts.size.large : AppFonts.size.xxLarge
      }
    },
    statContainer: {
      ...AppStyles.center,
      flex: 1,
      textAlign: 'center',
    },
    statTxt: {
      ...AppStyles.center,
      backgroundColor: AppColors.blue,
      height: 50,
      width: 50,
      borderRadius: 25,
      color: AppColors.white
    },
    statTitle: {
      marginTop: 8,
      color: AppColors.blue,
      fontSize: AppFonts.size.medSmall,
    },
    notesContainer: {
      flex: 1,
      minWidth: 200,
      height: 100,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
      fontSize: AppFonts.size.medSmall,
      borderRadius: 20,
      padding: 10,
      border: `1px solid ${AppColors.blue}`,
      margin: 20,
    },
    mainButton: (isSmallScreen, isMediumScreen) => {
      return {
        addStyles: {
          ...AppFonts.Raleway.bold,
          fontSize: isSmallScreen ? AppFonts.size.medSmall : AppFonts.size.medium,
          border: 'none',
          boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
          height: isMediumScreen ? 40 : 60,
          width: isMediumScreen ? 100 : 180,
          borderRadius: isMediumScreen ? 20 : 30,
          margin: 16,
        },
        ...AppStyles.activeBtn
      }
    },
}