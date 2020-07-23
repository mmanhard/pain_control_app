import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: (isSmallScreen) => {
      return {
        ...AppStyles.fill,
        padding: isSmallScreen ? '80px 0px 0px 0px' : '110px 30px 30px 30px',
      }
    },
    contentContainer: (isSmallScreen) => {
      const flexStyle = isSmallScreen ? AppStyles.columnStart : AppStyles.rowSpace;
      return {
        height: '100%',
        width: '100%',
        ...flexStyle,
        alignItems: 'flex-start',
      }
    },
    configContainer: (isSmallScreen) => {
      return {
        width: isSmallScreen ? '100%' : 400,
        marginRight: isSmallScreen ? 0 : 30,
        ...AppStyles.columnStart,
      }
    },
    titleContainer: (isSmallScreen) => {
      return {
        height: isSmallScreen ? 100 : 150,
        width: '100%',
        backgroundColor: isSmallScreen ? AppColors.white : AppColors.blue,
        ...AppFonts.Raleway.bold,
        color: isSmallScreen ? AppColors.blue : AppColors.white,
        ...AppStyles.center
      }
    },
    titleTxt: (isMediumScreen) => {
      return {
        margin: 12,
        fontSize: isMediumScreen ? AppFonts.size.large : AppFonts.size.xLarge,
        textAlign: 'center',
      }
    },
    configContentContainer: (isSmallScreen) => {
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        marginTop: isSmallScreen ? 0 : 30,
        width: '100%',
        ...contentContainer,
        ...AppStyles.columnStart,
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
      }
    },
    configAMPM: {
      height: 36,
      width: 54,
      borderRadius: 18,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
      paddingLeft: 6,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      textAlign: 'center',
      border: 'none',
      boxShadow: AppStyles.typBoxShadow,
      alignItems: 'center'
    },
    configRow: {
      margin: 20,
      ...AppStyles.rowStart,
      width: '90%'
    },
    configTitle: {
      ...AppStyles.center,
      alignItems: 'flex-start',
      width: 180,
      height: 68,
      borderRadius: 34,
      backgroundColor: AppColors.blue,
    },
    configTitleTxt: {
      marginLeft: 20,
      color: AppColors.white,
      fontSize: AppFonts.size.medLarge,
    },
    configSubtitleTxt: {
      color: AppColors.blue,
      fontSize: AppFonts.size.medLarge,
    },
    configTimeTxt: {
      background: 'none',
      color: AppColors.black,
      border: 'none',
      borderRadius: 0,
      textAlign: 'center',
      width: 120,
      margin: 10,
      borderBottom: `solid 2px ${AppColors.blue}`,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
    },
    helpIcon: {
      height: 24,
      width: 24,
      borderRadius: 14,
      marginLeft: 10,
      border: `solid 2px ${AppColors.blue}`,
      color: AppColors.blue,
      textAlign: 'center'
    },
    configDisplayTxt: {
      height: 32,
      borderRadius: 24,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 10,
      textAlign: 'center',
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
    },
    entryContainer: (isSmallScreen) => {
      const controlWidth = isSmallScreen ? {width: '100%'} : {minWidth: 500};
      const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
      return {
        padding: isSmallScreen ? 0 : 30,
        ...controlWidth,
        flex: 1,
        ...contentContainer,
      }
    },
    painLevelsContainer: {
      width: '100%',
    },
    partsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    partContainer: (isSmallScreen, selected) => {
      return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...AppFonts.Raleway.bold,
        fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
        border: 'none',
        backgroundColor: selected ? AppColors.blue : AppColors.lilac,
        color: selected ? AppColors.lilac : AppColors.blue,
        borderRadius: 18,
        minWidth: 140,
        height: 36,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 16,
        paddingLeft: 10,
      };
    },
    painLevelInput: {
      margin: 6,
      height: 24,
      width: 40,
      borderRadius: 14,
      backgroundColor: AppColors.white,
      ...AppStyles.center,
      textAlign: 'center',
      border: 'none'
    },
    visualizer: (isSmallScreen) => {
      return {
        ...AppStyles.rowSpace,
        alignItems: 'center',
        height: isSmallScreen ? 120 : 300,
        width: isSmallScreen ? 180 : 300,
        border: `solid 8px ${AppColors.blue}`,
        boxShadow: AppStyles.typBoxShadow,
        borderRadius: 40,
        margin: 20,
      }
    },
    backBtn: {
      addStyles: {
        ...AppStyles.closeBtn,
        marginLeft: 15,
        marginTop: 15,
      },
      ...AppStyles.activeBtn
    },
    bodyPartNoteContainer: {
      ...AppStyles.center,
    },
    bodyPartNote: {
      ...AppStyles.rowSpace,
      height: 180,
      width: '100%',
      marginTop: 8,
      marginBottom: 22,
    },
    bodyPartTitle: {
      height: 50,
      width: 200,
      borderRadius: 45,
      paddingTop: 20,
      backgroundColor: AppColors.blue,
      ...AppFonts.Raleway.bold,
      color: AppColors.white,
      fontSize: AppFonts.size.large,
      textAlign: 'center',
      marginBottom: 10,
    },
    levelContainer: {
      height: 36,
      width: 140,
      borderRadius: 25,
      paddingTop: 14,
      backgroundColor: AppColors.lilac,
      ...AppFonts.Raleway.bold,
      color: AppColors.blue,
      fontSize: AppFonts.size.medium,
      textAlign: 'center',
    },
    bodyPartNotesInput: {
      border: 'none',
      padding: 10,
      ...AppFonts.Raleway.regular,
      color: AppColors.blue,
      backgroundColor: AppColors.lilac,
      borderRadius: 20,
      marginTop: 10,
      marginBottom: 10,
      resize: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
    },
    continueBtn: {
      addStyles: {
        ...AppStyles.largeBtn,
      },
      ...AppStyles.activeBtn
    },
    skipBtn: {
      addStyles: {
        ...AppStyles.subtleBtn,
        marginTop: 10,
        height: 24,
        width: 60,
        borderRadius: 12,
      },
      ...AppStyles.insetBtn
    },
    addNotesContainer: {
      paddingTop: 20,
      ...AppStyles.center,
    },
    entryNotesInput: {
      border: 'none',
      padding: 10,
      ...AppFonts.Raleway.regular,
      color: AppColors.blue,
      backgroundColor: AppColors.lilac,
      borderRadius: 20,
      width: '85%',
      marginBottom: 20,
      resize: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
    },
    counterText: {
      position: 'relative',
      bottom: 70,
      ...AppFonts.Raleway.regular,
      color: AppColors.blue,
    },
    mainButton: (selected) => {
      const btnType = selected ? AppStyles.activeBtn : AppStyles.inactiveBtn;
      return {
        addStyles: {
            ...AppFonts.Raleway.bold,
          fontSize: AppFonts.size.medLarge,
          boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
          height: 60,
          width: 180,
          borderRadius: 30,
          margin: 10
        },
        ...btnType
      }
    },
}