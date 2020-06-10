import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    ...AppStyles.fill,
    ...AppStyles.center,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: AppColors.lilac,
  },
  titleContainer: {
    height: 150,
    width: 600,
    backgroundColor: AppColors.blue,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt: {
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.xLarge,
    color: AppColors.white,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  subtitleTxt: {
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medium,
    color: AppColors.white,
    textAlign: 'center',
    marginTop: 0
  },
  contentContainer: {
    ...AppStyles.typContentContainer,
    marginTop: 20,
    width: 400,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backBtn: {
    ...AppStyles.closeBtn,
    margin: 15,
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
  continueBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.blue,
    color: AppColors.white,
  },
  skipBtn: {
    ...AppStyles.subtleBtn,
    marginTop: 10,
  },
  medHistoryInput: {
    border: 'none',
    padding: 10,
    ...AppFonts.Raleway.regular,
    color: AppColors.blue,
    backgroundColor: AppColors.lilac,
    borderRadius: 20,
    marginBottom: 10,
  }
}