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
  titleTxt: {
    fontSize: AppFonts.size.xLarge,
    textAlign: 'center',
  },
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: (isSmallScreen) => {
    const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      marginTop: isSmallScreen ? 0 : 30,
      width: '100%',
      ...contentContainer,
      ...AppStyles.rowCenter,
      alignItems: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
    }
  },
  configTitle: (isSmallScreen, selected) => {
    const btnType = selected ? AppStyles.activeBtn : AppStyles.inactiveBtn;
    return {
      addStyles: {
        ...AppStyles.center,
        alignItems: 'flex-start',
        width: isSmallScreen ? 100 : 140,
        height: isSmallScreen ? 48 : 68,
        borderRadius: isSmallScreen ? 24 : 34,
        margin: isSmallScreen ? '0px 10px 20px 10px' : '20px 10px 20px 10px',
        boxShadow: AppStyles.typBoxShadow,
        fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medLarge,
        ...AppFonts.Raleway.bold,
      },
      ...btnType
    }
  },
  configTitleTxt: (isSmallScreen) => {
    return {
      marginLeft: isSmallScreen ? 8 : 20,
    }
  },
  mainContainer: (isSmallScreen) => {
    const controlWidth = isSmallScreen ? {width: '100%'} : {};
    const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      ...controlWidth,
      flex: 1,
      ...contentContainer,
    }
  },
  editInfoContainer: (isMediumScreen) => {
    const flexStyle = isMediumScreen ? AppStyles.center : AppStyles.rowStart;
    return {
      ...flexStyle,
      alignItems: 'stretch'
    }
  },
  editPartsContainer: {
    ...AppStyles.columnStart
  },
  bodyPartsContainer: (isSmallScreen) => {
    const minWidth = isSmallScreen ? {} : {minWidth: 500};
    return {
      width: '100%',
      ...minWidth,
      marginTop: isSmallScreen ? 10 : 24,
    }
  },
  partsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  partContainer: (isSmallScreen, selected) => {
    const btnType = selected ? AppStyles.activeBtn : AppStyles.inactiveBtn;
    return {
      addStyles: {
        ...AppStyles.rowBetween,
        alignItems: 'center',
        ...AppFonts.Raleway.bold,
        fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
        borderRadius: 18,
        minWidth: 140,
        height: 36,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 16,
        paddingLeft: 10,
      },
      ...btnType
    };
  },
  addMorePartsBtn: (selected) => {
    const btnType = selected ? AppStyles.activeBtn : AppStyles.inactiveBtn;
    return {
      addStyles: {
        ...AppFonts.Raleway.bold,
        fontSize: AppFonts.size.medium,
        borderRadius: 18,
        width: 140,
        height: 36,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 16,
      },
      ...btnType
    };
  },
  partDetailsContainer: {
    marginTop: 20,
    flex: 1,
    width: '90%',
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
    ...AppStyles.columnStart,
  },
  changePwdLeft: {
    flex: 1,
    ...AppStyles.columnStart,
  },
  formContainer: {
    ...AppStyles.center,
    width: '100%',
    flex: 2,
    marginTop: 30,
  },
  txtInputContainer: {
    height: 36,
    marginBottom: 40,
    maxWidth: 320,
    width: '65%',
    ...AppStyles.rowStart,
    borderBottom: `1px solid ${AppColors.blue}`
  },
  txtInput: {
    ...AppFonts.Raleway.bold,
    flex: 1,
    paddingLeft: 10,
    border: 'none',
    borderRadius: 0,
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
    height: 110,
    width: 200,
    ...AppStyles.center,
    alignItems: 'flex-start',
    backgroundColor: AppColors.blue,
    margin: 20,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: AppFonts.size.xLarge,
    color: AppColors.white,
    borderRadius: 20,
    boxShadow: AppStyles.typBoxShadow
  },
  continueBtn: {
    addStyles: {
      ...AppStyles.largeBtn,
    },
    ...AppStyles.activeBtn
  },
  flashMessage: (isSmallScreen, flashMessage, flashSuccess) => {
    return {
      width: '90%',
      marginTop: 10,
      height: flashMessage ? 80 : 0,
      borderRadius: 20,
      backgroundColor: flashSuccess ? AppColors.flashGreen : AppColors.flashRed,
      alignSelf: 'center',
      ...AppStyles.center,
      fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medium,
      color: flashSuccess ? AppColors.flashGreenTxt : AppColors.flashRedTxt
    };
  },
}