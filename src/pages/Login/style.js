import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    ...AppStyles.fill,
    ...AppStyles.center,
    backgroundColor: AppColors.lilac,
  },
  contentContainer: {
    ...AppStyles.fill,
    margin: 100,
    backgroundColor: AppColors.blue,
    boxShadow: AppStyles.typBoxShadow,
    minHeight: 320,
    minWidth: 625
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 400,
    fontSize: AppFonts.size.xSmall,
    color: AppColors.lightGrey,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 40,
    borderStyle: 'solid',
    borderWidth: 0.25,
    borderColor: AppColors.blue,
  },
  formModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: 'auto',
    width: 400,
    height: 425,
    fontSize: AppFonts.size.xSmall,
    color: AppColors.lightGrey,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 40,
    borderStyle: 'solid',
    borderWidth: 0.25,
    borderColor: AppColors.blue,
  },
  noLoginContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  titleTxt: {
    margin: 0,
    ...AppFonts.Raleway.bold,
    color: AppColors.white,
    fontSize: AppFonts.size.xxLarge
  },
  loginContainer: {
    flex: 1,
    padding: '20px 80px 50px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  loginBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.blue,
    color: AppColors.white,
  },
  registerBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
  }
}