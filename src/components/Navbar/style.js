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
      ...AppStyles.rowEnd,
      alignItems: 'center',
      position: 'relative'
    },
    welcomeTxt: {
      ...AppFonts.Raleway.regular,
      fontSize: AppFonts.size.medLarge,
      color: AppColors.white,
      marginRight: 0,
    },
    dropdownToggle: (isMobile, dropdownVisible) => {
      return ({
        ...AppStyles.center,
        transform: dropdownVisible ? 'rotate(90deg)' : 'rotate(-90deg)',
        marginRight: isMobile ? 0 : 12,
        border: 'none',
        background: 'transparent',
        width: 28,
        height: 28
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
    dropdownMenu: (isMobile) => {
      return {
        display: 'flex',
        position: 'absolute',
        top: 48,
        right: isMobile ? 60 : 120,
        width: 160,
        backgroundColor: AppColors.white,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        boxShadow: AppStyles.typBoxShadow,
        borderTopLeftRadius: 20,
        padding: 10,
        ...AppStyles.typBorder,
      }
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
      ...AppStyles.rowStart,
      alignItems: 'center'
    },
    addIconBtn: (isMobile) => {
      return {
        ...AppStyles.center,
        width: 40,
        background: 'transparent',
        border: 'none',
        marginRight: isMobile ? 12 : 64
      }
    }
}