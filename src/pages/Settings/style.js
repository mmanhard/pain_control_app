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
    marginTop: 40,
  },
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: {
    marginTop: 30,
    height: 200,
    width: 400,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowCenter,
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  configTitle: (selected) => {
    return {
      ...AppStyles.center,
      alignItems: 'flex-start',
      width: 140,
      height: 68,
      borderRadius: 34,
      margin: 10,
      color: selected ? AppColors.white : AppColors.blue,
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      border: 'none',
      boxShadow: AppStyles.typBoxShadow,
      fontSize: AppFonts.size.medLarge,
      ...AppFonts.Raleway.bold,
    }
  },
  configTitleTxt: {
    marginLeft: 20,
  },
  entriesContainer: (windowWidth) => {
    return {
      width: windowWidth - 550,
      minWidth: 500,
      top: 100,
      bottom: 0,
      right: 50,
      position: 'absolute',
      ...AppStyles.columnStart
    }
  },
  editAccountContainer: {
    width: '100%',
    padding: 30,
    marginBottom: 30,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowStart,
    alignItems: 'center'
  },
  editPartsContainer: {
    width: '100%',
    padding: 30,
    marginBottom: 30,
    ...AppStyles.typContentContainer,
    ...AppStyles.center
  },
  editPwdContainer: {
    width: '100%',
    padding: 30,
    marginBottom: 30,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowStart,
    alignItems: 'center'
  },
  bodyPartsContainer: {
    width: '100%',
    marginTop: 30,
  },
  partsContainer: (offset) => {
    return {
      marginLeft: offset,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    };
  },
  partContainer: (selected) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      border: 'none',
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      color: selected ? AppColors.lilac : AppColors.blue,
      borderRadius: 18,
      width: 140,
      height: 36,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 16,
      paddingLeft: 10,
    };
  },
  addMorePartsBtn: (selected) => {
    return {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      border: 'none',
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      color: selected ? AppColors.lilac : AppColors.blue,
      borderRadius: 18,
      width: 140,
      height: 36,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 16,
    };
  },
  partDetailsContainer: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    ...AppStyles.rowCenter
  },
  editTxt: {
    margin: 6,
    height: 24,
    width: 40,
    borderRadius: 14,
    backgroundColor: AppColors.white,
    color: AppColors.black,
    ...AppStyles.center,
    textAlign: 'center',
    border: 'none',
    fontSize: AppFonts.size.medSmall
  },
  editAccountLeft: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  changePwdLeft: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  formContainer: {
    ...AppStyles.center,
    flex: 2,
    marginTop: 30,
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 40,
    maxWidth: 320,
    width: '65%',
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
    width: 50,
  },
  partInputContainer: {
    height: 36,
    marginBottom: 40,
    marginRight: 20,
    width: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottom: `1px solid ${AppColors.blue}`
  },
  entryDetailsContainer: {
    flex: 1,
    height: '100%',
    ...AppStyles.columnStart,
  },
  settingsTitleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 110,
    width: 200,
    ...AppStyles.center,
    alignItems: 'flex-start',
    backgroundColor: AppColors.blue,
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
}