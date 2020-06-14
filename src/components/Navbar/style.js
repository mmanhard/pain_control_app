import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 80,
      zIndex: 1,
      margin: 0,
      backgroundColor: AppColors.blue,
      boxShadow: AppStyles.typBoxShadow,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    welcomeTxt: {
      ...AppFonts.Raleway.regular,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.white,
      marginRight: 0,
    },
    dropdownToggle: (dropdownVisible) => {
      return ({
        transform: dropdownVisible ? 'rotate(90deg)' : 'rotate(-90deg)',
        marginLeft: 0,
        marginRight: 12,
        marginTop: dropdownVisible ? 2 : 0,
        border: 'none',
        background: 'transparent'
      });
    },
    dropdownContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    dropdownMenu: {
      display: 'flex',
      position: 'absolute',
      top: 72,
      right: 80,
      width: 160,
      backgroundColor: AppColors.white,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      boxShadow: AppStyles.typBoxShadow,
      borderTopLeftRadius: 20,
      padding: 10,
      ...AppStyles.typBorder,
    },
    dropdownItem: {
      height: 48,
      ...AppFonts.Raleway.regular,
      fontSize: AppFonts.size.medium,
      border: 'none',
      textAlign: 'start',
      color: AppFonts.lightGrey,
      textDecoration: 'none',
      background: 'transparent',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
}