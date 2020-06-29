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
    ...AppStyles.rowCenter,
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px 10px 10px 20px',
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
  entryContainer: {
    width: '100%',
    height: 350,
    padding: 30,
    marginBottom: 30,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowStart,
    alignItems: 'center'
  },
  formContainer: {
    ...AppStyles.center,
    width: '100%'
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 60,
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
}