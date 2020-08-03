import color from 'color';

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
    const controlWidth = isSmallScreen ? {width: '100%'} : {maxWidth: 480, minWidth: 340};
    return {
      backgroundColor: isSmallScreen ? AppColors.white : AppColors.lilac,
      position: 'sticky',
      top: isSmallScreen ? 80 : 110,
      ...controlWidth,
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
  subtitleTxt: {
    fontSize: AppFonts.size.medium,
  },
  configContentContainer: (isSmallScreen) => {
    const contentContainer = isSmallScreen ? AppStyles.mobileContentContaner : AppStyles.typContentContainer;
    return {
      marginTop: isSmallScreen ? 0 : 20,
      width: '100%',
      ...contentContainer,
      ...AppStyles.columnStart,
      alignItems: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
      boxShadow: AppStyles.typBoxShadow
    }
  },
  configRow: {
    ...AppStyles.rowStart,
    width: '100%',
    marginTop: 18,
    flex: 1,
  },
  configTitle: (isSmallScreen) => {
    return {
      ...AppStyles.center,
      alignItems: isSmallScreen ? 'center' : 'flex-start',
      width: isSmallScreen ? 64 : 140,
      height: isSmallScreen ? 24 : 68,
      borderRadius: isSmallScreen ? 12 : 34,
      backgroundColor: AppColors.blue,
      marginLeft: isSmallScreen ? 0 : 20,
    }
  },
  configTitleTxt: (isSmallScreen) => {
    return {
      marginLeft: isSmallScreen ? 0 : 20,
      color: AppColors.white,
      fontSize: isSmallScreen ? AppFonts.size.medium : AppFonts.size.medLarge,
    }
  },
  filterOptions: {
    flex: 1,
    ...AppStyles.rowCenter
  },
  filterOption: {
    ...AppStyles.center,
  },
  filterOptionTitle: {
    color: AppColors.blue,
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medLarge,
    margin: 10,
  },
  filterOptionTxt: (isMobile) => {
    return {
      height: isMobile ? 24 : 36,
      width: isMobile ? 80 : 100,
      borderRadius: isMobile ? 12 : 18,
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
      ...AppFonts.Raleway.bold,
      fontSize: isMobile ? AppFonts.size.xSmall : AppFonts.size.small,
      textAlign: 'center',
      border: 'none',
      boxShadow: AppStyles.typBoxShadow,
      alignItems: 'center'
    }
  },
  sortOptions: (isMobile) => {
    const flexStyle = isMobile ? AppStyles.rowSpace : AppStyles.rowCenter;
    return {
      flex: 1,
      ...flexStyle,
      flexWrap: 'wrap'
    }
  },
  sortOption: (isMobile, selected) => {
    const btnStyles = selected ? AppStyles.activeBtn : AppStyles.inactiveBtn;
    return {
      addStyles: {
        textAlign: 'center',
        ...AppFonts.Raleway.bold,
        fontSize: AppFonts.size.medium,
        border: 'none',
        borderRadius: 18,
        height: isMobile ? 24 : 36,
        width: isMobile ? 70 : 100,
        borderRadius: isMobile ? 12 : 18,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 16,
        boxShadow : AppStyles.typBoxShadow
      },
      ...btnStyles
    };
  },
  entryNumberText: {
    textAlign: 'center',
    width: 180,
    height: 26,
    borderRadius: 16,
    paddingTop: 6,
    marginTop: 10,
    marginBottom: 20,
    color: AppColors.blue,
    backgroundColor: AppColors.lilac
  },
  entriesContainer: (isSmallScreen, isMediumScreen) => {
    const minWidth = isMediumScreen ? 420 : 700;
    const controlWidth = isSmallScreen ? {width: '100%'} : {minWidth};
    return {
      ...controlWidth,
      flex: 1,
      ...AppStyles.columnStart,
    }
  },
  entryContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
    ...AppStyles.typContentContainer,
    ...AppStyles.rowSpace,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  entryDetailsContainer: (isSmallScreen, isMediumScreen) => {
    const controlHeight = isMediumScreen ? {} : {height: 480}
    const flexStyle = isMediumScreen
      ? (isSmallScreen ? AppStyles.rowSpace : AppStyles.center)
      : AppStyles.columnSpace;
    return {
      flex: 1,
      ...controlHeight,
      width: '100%',
      ...flexStyle,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  },
  entryTitleContainer: (isSmallScreen) => {
    return {
      ...AppStyles.center,
      alignSelf: isSmallScreen ? 'center' : 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: AppColors.blue,
      width: isSmallScreen ? 120 : 210,
      height: isSmallScreen ? 72 : 110,
      paddingLeft: isSmallScreen ? 12 : 24,
      paddingRight: isSmallScreen ? 12 : 24,
      marginTop: isSmallScreen ? 0 : 20,
      marginLeft: isSmallScreen ? 0 : 20,
      fontSize: isSmallScreen ? AppFonts.size.medSmall : 24,
      color: AppColors.white,
      borderRadius: 20,
      boxShadow: AppStyles.typBoxShadow
    };
  },
  continueBtn: {
    addStyles: {
      ...AppStyles.largeBtn,
      marginBottom: 20,
    },
    ...AppStyles.activeBtn
  },
  deleteBtn: {
    normalStyle: {
      height: 40,
      width: 90,
      borderRadius: 10,
      border: 'none',
      marginBottom: 20,
      backgroundColor: AppColors.deleteRed,
      color: AppColors.white,
      boxShadow: AppStyles.typBoxShadow,
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.small,
    },
    hoverStyle: {
      backgroundColor: color(AppColors.deleteRed).darken(0.01).hex(),
      transform: 'scale(0.99) rotate(0.2deg) translateY(1px)',
    },
    activeStyle: {
      backgroundColor: color(AppColors.deleteRed).darken(0.03).hex(),
      transform: 'scale(0.97) rotate(0.5deg) translateY(3px)',
    }
  },
  entryContent: {
    ...AppStyles.center,
  },
  statsRow: (isSmallScreen) => {
    return {
      ...AppStyles.rowSpace,
      alignItems: 'flex-start',
      paddingTop: 32,
      paddingLeft: 20,
      paddingRight: 20,
      width: isSmallScreen ? 120 : 280,
      marginTop: isSmallScreen ? 0 : 10,
      marginLeft: 4,
      marginRight: 12,
      marginBottom: 20,
      backgroundColor: AppColors.lilac,
      height: isSmallScreen ? 90 : 120,
      borderRadius: 40,
    }
  },
  statContainer: {
    ...AppStyles.center,
    flex: 1,
    textAlign: 'center',
  },
  statTxt: {
    ...AppStyles.center,
    backgroundColor: AppColors.blue,
    height: 50,
    width: 50,
    borderRadius: 25,
    color: AppColors.white
  },
  statTitle: (isSmallScreen) => {
    return {
      marginTop: 8,
      color: AppColors.blue,
      fontSize: isSmallScreen ? AppFonts.size.small : AppFonts.size.medSmall
    }
  },
  visualizer: (isSmallScreen) => {
    return {
      ...AppStyles.rowSpace,
      alignItems: 'center',
      height: isSmallScreen ? 100 : 300,
      width: isSmallScreen ? 100 : 300,
      border: `solid 8px ${AppColors.blue}`,
      boxShadow: AppStyles.typBoxShadow,
      borderRadius: 40,
      margin: 20,
    }
  },
  emptyStateContainer: (isSmallScreen) => {
    return {
      width: isSmallScreen ? '80%': '50%',
      padding: 30,
      marginTop: 10,
      marginBottom: 20,
      ...AppStyles.center,
      ...AppStyles.typContentContainer,
      color: AppColors.blue
    }
  },
  flashMessage: (isSmallScreen, flashMessage, flashSuccess) => {
    return {
      width: isSmallScreen ? '90%' : '100%',
      marginTop: 20,
      marginBottom: isSmallScreen ? 10 : 0,
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