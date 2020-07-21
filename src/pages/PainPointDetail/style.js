import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
  container: {
    padding: '110px 30px 30px 30px',
    ...AppStyles.columnStart,
    flex: 1,
  },
  configContainer: {
    width: '100%',
    top: 110,
    left: 30,
    marginRight: 30,
    height: 150,
    marginBottom: 30,
    ...AppStyles.rowSpace,
  },
  titleContainer: {
    height: '100%',
    width: 400,
    backgroundColor: AppColors.blue,
    ...AppFonts.Raleway.bold,
    color: AppColors.white,
    textAlign: 'center',
    marginRight: 30,
    ...AppStyles.rowSpace,
    alignItems: 'center'
  },
  titleTxt: {
    fontSize: AppFonts.size.xxLarge,
    textAlign: 'center',
    flex: 1,
  },
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: {
    flex: 1,
    minWidth: 400,
    height: '100%',
    ...AppStyles.typContentContainer,
    ...AppStyles.rowSpace,
    alignItems: 'center'
  },
  toggleTxtContainer: {
    height: 90,
    width: 100,
    borderRadius: 20,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
    marginLeft: 20,
    paddingLeft: 20,
    ...AppStyles.center,
    alignItems: 'start'
  },
  mainButton: {
    addStyles: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      border: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
      height: 60,
      width: 180,
      borderRadius: 30,
      margin: 10,
    },
    ...AppStyles.activeBtn
  },
  mainButtonInactive: {
    addStyles: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medLarge,
      border: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
      height: 60,
      width: 180,
      borderRadius: 30,
      margin: 10,
    },
    ...AppStyles.inactiveBtn
  },
  mainContentContainer: {
    ...AppStyles.typContentContainer,
    padding: 20,
    flex: 1,
    width: '90%',
    ...AppStyles.rowSpace
  },
  graphContainer: {
    ...AppStyles.center,
    flex: 1,
    height: '100%',
    position: 'relative',
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
  filterContainer: (customStartDate) => {
    return {
      ...AppStyles.center,
      justifyContent: 'space-evenly',
      borderRadius: 20,
      backgroundColor: AppColors.lilac,
      width: 180,
      height: customStartDate ? 400 : 200,
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
  }
}