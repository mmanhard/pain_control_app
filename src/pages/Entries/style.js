import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    position: 'relative',
    padding: '110px 30px 30px 30px',
  },
  configContainer: {
    width: 400,
    top: 110,
    left: 30,
    position: 'fixed',
    marginRight: 30,
    height: '100%',
    ...AppStyles.columnStart
  },
  titleContainer: {
    height: 150,
    width: '100%',
    backgroundColor: AppColors.blue,
    ...AppFonts.Raleway.bold,
    color: AppColors.white,
    textAlign: 'center',
  },
  titleTxt: {
    fontSize: AppFonts.size.xLarge,
    textAlign: 'center',
    marginTop: 32,
  },
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: {
    marginTop: 30,
    height: 400,
    width: 370,
    ...AppStyles.typContentContainer,
    ...AppStyles.columnSpace,
    padding: '20px 10px 10px 20px',
  },
  configRow: {
    ...AppStyles.rowStart,
    width: '100%',
  },
  configTitle: {
    ...AppStyles.center,
    alignItems: 'flex-start',
    width: 140,
    height: 68,
    borderRadius: 34,
    backgroundColor: AppColors.blue,
  },
  configTitleTxt: {
    marginLeft: 20,
    color: AppColors.white,
    fontSize: AppFonts.size.medLarge,
  },
  filterOptions: {
    flex: 1,
    ...AppStyles.rowCenter
  },
  filterOption: {
    ...AppStyles.center,
  },
  filterOptionTitle: {
    color: AppColors.blue,
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medLarge,
    margin: 10,
  },
  filterOptionTxt: {
    height: 36,
    width: 120,
    borderRadius: 18,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medium,
    textAlign: 'center',
    border: 'none',
    boxShadow: AppStyles.typBoxShadow,
    alignItems: 'center'
  },
  sortOptions: {
    flex: 1,
    ...AppStyles.rowCenter,
    flexWrap: 'wrap'
  },
  sortOption: (selected) => {
    return {
      textAlign: 'center',
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      border: 'none',
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      color: selected ? AppColors.lilac : AppColors.blue,
      borderRadius: 18,
      width: 100,
      height: 36,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 16,
      paddingLeft: 10,
    };
  },
  entryNumberText: {
    color: AppColors.blue,
  },
  entriesContainer: (windowWidth) => {
    return {
      width: windowWidth - 550,
      minWidth: 500,
      top: 100,
      right: 50,
      position: 'absolute',
      ...AppStyles.columnStart
    }
  },
  entryContainer: {
    width: '100%',
    height: 350,
    padding: 30,
    marginBottom: 30,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowStart,
    alignItems: 'center'
  },
  entryDetailsContainer: {
    flex: 1,
    height: '100%',
    ...AppStyles.columnStart,
  },
  entryTitleContainer: {
    ...AppStyles.center,
    alignItems: 'flex-start',
    backgroundColor: AppColors.blue,
    height: 110,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: AppFonts.size.xLarge,
    color: AppColors.white,
    borderRadius: 20,
    boxShadow: AppStyles.typBoxShadow
  },
  continueBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.blue,
    color: AppColors.white,
  },
  skipBtn: {
    ...AppStyles.subtleBtn,
    marginTop: 10,
  },
  statsRow: {
    ...AppStyles.rowStart,
    alignItems: 'center',
    flex: 1,
    width: '95%',
    marginTop: 10,
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
  visualizer: {
    backgroundColor: AppColors.white,
    border: `solid 8px ${AppColors.blue}`,
    boxShadow: AppStyles.typBoxShadow,
    borderRadius: 40,
    marginLeft: 50,
    marginRight: 20,
    height: '80%',
    flex: 0.8
  },
}