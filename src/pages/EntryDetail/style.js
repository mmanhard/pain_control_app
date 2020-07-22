import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: {
      ...AppStyles.fill,
      paddingTop: 80
    },
    contentContainer: {
      ...AppStyles.rowCenter,
      height: '100%'
    },
    leftContentContainer: {
      flex: 1,
      margin: 30,
      backgroundColor: 'white',
      padding: 30,
      minWidth: 500,
      ...AppStyles.typContentContainer,
      ...AppStyles.center,
    },
    titleContainer: {
      ...AppStyles.center,
      alignItems: 'flex-start',
      backgroundColor: AppColors.blue,
      position: 'absolute',
      top: 0,
      left: 0,
      height: 110,
      minWidth: 200,
      paddingLeft: 10,
      paddingRight: 10,
      ...AppFonts.Raleway.regular,
      fontSize: AppFonts.size.xxLarge,
      color: AppColors.white,
      borderRadius: 20,
      boxShadow: AppStyles.typBoxShadow
    },
    helpIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: 24,
      width: 24,
      borderRadius: 14,
      border: `solid 2px ${AppColors.blue}`,
      color: AppColors.blue,
      textAlign: 'center'
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
    visualizer: {
      backgroundColor: AppColors.white,
      border: `solid 8px ${AppColors.blue}`,
      boxShadow: AppStyles.typBoxShadow,
      borderRadius: 40,
      position: 'absolute',
      top: '10%',
      right: 0,
      width: '50%',
      height: '80%'
    },
    painLegend: {
      ...AppStyles.rowStart,
      ...AppStyles.typContentContainer,
      alignItems: 'center',
      width: '100%',
      height: 100,
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
    rightContentContainer: {
      flex: 1,
      margin: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    basicStatsContainer: {
      ...AppStyles.rowSpace,
      alignItems: 'center',
      backgroundColor: AppColors.lilac,
      position: 'absolute',
      top: 0,
      right: 0,
      height: 90,
      width: 225,
      padding: 10,
      borderRadius: 20,
    },
    statsContainer: {
      ...AppStyles.center,
      ...AppStyles.typContentContainer,
      flex: 1,
      width: '100%',
      marginTop: 30
    },
    statsRow: {
      ...AppStyles.rowStart,
      paddingLeft: 30,
      alignItems: 'center',
      flex: 1,
      width: '95%',
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
    painLevelTxt: {
      ...AppStyles.center,
      backgroundColor: AppColors.blue,
      height: 110,
      width: 110,
      borderRadius: 55,
      color: AppColors.white,
      fontSize: AppFonts.size.xxLarge
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
      width: 250,
      height: 100,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
      fontSize: AppFonts.size.medSmall,
      borderRadius: 20,
      padding: 10,
      border: `1px solid ${AppColors.blue}`,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonContainer: {
      ...AppStyles.center,
      flex: 1,
      height: '100%',
      backgroundColor: 'red'
    },
    mainButtonContainer: {
      ...AppStyles.typContentContainer,
      height: 120,
      width: '100%',
      marginTop: 20,
      ...AppStyles.rowSpace,
      alignItems: 'center'
    },
    mainButton: (isSmallScreen) => {
      return {
        addStyles: {
          ...AppFonts.Raleway.bold,
          fontSize: isSmallScreen ? AppFonts.size.medSmall : AppFonts.size.medium,
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
    mainButtonInactive: (isSmallScreen) => {
      return {
        addStyles: {
          ...AppFonts.Raleway.bold,
          fontSize: isSmallScreen ? AppFonts.size.medSmall : AppFonts.size.medium,
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
}