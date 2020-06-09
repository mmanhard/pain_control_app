import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
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
  registerBtn: {
    ...AppStyles.largeBtn,
    backgroundColor: AppColors.blue,
    color: AppColors.white,
  },
}