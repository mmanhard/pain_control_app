import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';
import color from 'color';

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
    homeBtn: (isMobile) => {
      return {
        addStyles: {
          ...AppStyles.center,
          height: 60,
          width: 48,
          borderRadius: 10,
          marginLeft: isMobile ? 18 : 48
        },
        ...AppStyles.insetBtn
      }
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
        addStyles: {
          ...AppStyles.center,
          transform: dropdownVisible ? 'rotate(90deg)' : 'rotate(-90deg)',
          marginLeft: isMobile ? 0 : 4,
          marginRight: isMobile ? 0 : 12,
          paddingBottom: 1,
          width: 28,
          height: 27,
          borderRadius: 6,
        },
        ...AppStyles.insetBtn
      });
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
      addStyles: {
        height: 48,
        borderRadius: 24,
        ...AppFonts.Raleway.regular,
        fontSize: AppFonts.size.medium,
        textAlign: 'start',
        color: AppFonts.lightGrey,
        textDecoration: 'none',
        paddingLeft: 16,
        width: '100%',
        ...AppStyles.rowStart,
        alignItems: 'center'
      },
      ...AppStyles.insetBtn
    },
    addIconBtn: (isMobile) => {
      return {
        addStyles: {
          ...AppStyles.center,
          height: 42,
          width: 42,
          borderRadius: 21,
          marginRight: isMobile ? 12 : 64
        },
        ...AppStyles.insetBtn
      }
    }
}