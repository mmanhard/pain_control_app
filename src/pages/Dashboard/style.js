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
    filterContainer: {
      ...AppStyles.center,
      justifyContent: 'space-evenly',
      borderRadius: 20,
      backgroundColor: AppColors.lilac,
      position: 'absolute',
      top: 140,
      left: '4%',
      width: 180,
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
      backgroundColor: AppColors.blue,
      height: 32,
      width: 80,
      borderRadius: 16,
      textAlign: 'center',
      border: 'none',
      color: AppColors.white,
      ...AppFonts.Raleway.bold,
      marginBottom: 12,
      boxShadow: AppStyles.typBoxShadow
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
    generalStatsContainer: {
      ...AppStyles.rowStart,
      flexWrap: 'wrap',
      alignContent: 'space-between',
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
      width: '25%',
      borderRadius: 20,
      color: AppColors.blue
    },
    statContainer: {
      ...AppStyles.center,
      width: '25%',
      textAlign: 'center',
    },
    statTxtBtn: {
      ...AppStyles.center,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      backgroundColor: AppColors.blue,
      height: 60,
      width: 60,
      borderRadius: 30,
      color: AppColors.white,
      border: 'none',
      boxShadow: AppStyles.typBoxShadow
    },
    statTxt: {
      ...AppStyles.center,
      backgroundColor: AppColors.blue,
      height: 60,
      width: 60,
      borderRadius: 30,
      color: AppColors.white
    },
    statTitle: {
      marginTop: 8,
      color: AppColors.blue,
      fontSize: AppFonts.size.medSmall,
    },
    mainButtonContainer: {
      ...AppStyles.typContentContainer,
      height: 120,
      width: '100%',
      marginTop: 20,
      ...AppStyles.rowSpace,
      alignItems: 'center'
    },
    mainButtonInactive: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      border: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
      height: 60,
      width: 180,
      borderRadius: 30,
      color: AppColors.blue,
      backgroundColor: AppColors.lilac,
      margin: 10,
    },
    mainButton: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      border: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
      height: 60,
      width: 180,
      borderRadius: 30,
      color: AppColors.white,
      backgroundColor: AppColors.blue,
      margin: 10,
    },
    actionModalTxt: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.black,
      marginTop: 30,
      textAlign: 'center',
      width: '80%'
    }
}