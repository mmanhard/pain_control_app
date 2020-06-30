import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    margin: 'auto',
    width: 400,
    height: 425,
    fontSize: AppFonts.size.xSmall,
    color: AppColors.lightGrey,
    ...AppStyles.typContentContainer
  },
  formContainer: {
    flex: 1,
    padding: '20px 60px 50px 60px',
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
    justifyContent: 'flex-start',
    borderBottom: `1px solid ${AppColors.blue}`
  },
  txtInput: {
    ...AppFonts.Raleway.bold,
    flex: 1,
    width: 10,
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