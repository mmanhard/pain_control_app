import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';

export default {
  container: {
    ...AppStyles.fill,
    ...AppStyles.columnStart,
    backgroundColor: AppColors.lilac,
    minHeight: 700
  },
  titleContainer: (isMobile) => {
    return {
      height: 150,
      marginTop: isMobile ? 0 : 20,
      width: isMobile ? '100%' : 576,
      backgroundColor: AppColors.blue,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: AppStyles.typBoxShadow,
    };
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
  contentContainer: (isMobile) => {
    return {
      ...AppStyles.typContentContainer,
      marginTop: 20,
      width: isMobile ? '90%' : 576,
      marginBottom: 20
    };
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    position: 'relative'
  },
  backBtn: {
    ...AppStyles.closeBtn,
    marginLeft: 15,
    marginTop: 15,
  },
  txtInputContainer: (isShortScreen) => {
    return {
      height: 36,
      marginBottom: isShortScreen ? 30 : 60,
      width: '65%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottom: `1px solid ${AppColors.blue}`
    };
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
    width: '85%',
    marginBottom: 20,
    resize: 'none',
    boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
  },
  partsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  partContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 4,
    marginBottom: 16
  },
  partButton: (isMobile, selected) => {
    return {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medium,
      border: 'none',
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      color: selected ? AppColors.lilac : AppColors.blue,
      borderRadius: 18,
      textAlign: 'center',
      width: isMobile ? 100 : 120,
      height: 36,
      marginBottom: 4,
    };
  },
  locButton: (selected) => {
    return {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.medSmall,
      border: 'none',
      backgroundColor: selected ? AppColors.blue : AppColors.lilac,
      color: selected ? AppColors.lilac : AppColors.blue,
      borderRadius: 16,
      textAlign: 'center',
      width: 32,
      height: 32,
      marginLeft: 2,
      marginRight: 2,
    };
  },
  addMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    height: 36,
    marginBottom: 32
  },
  otherPartContainer: {
    borderBottom: `1px solid ${AppColors.blue}`,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 4,
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  removePartBtn: {
    border: 'none',
    background: 'transparent',
    ...AppFonts.Raleway.regular,
    fontSize: AppFonts.size.medium,
    textDecoration: 'none',
    width: 36
  },
  counterText: {
    position: 'relative',
    bottom: 70,
    ...AppFonts.Raleway.regular,
    color: AppColors.blue,
  }
}