import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: {
      ...AppStyles.rowSpace,
      padding: '110px 30px 30px 30px',
    },
    configContainer: {
      width: 400,
      marginRight: 30,
      height: '100%',
      ...AppStyles.columnStart
    },
    titleContainer: {
      height: 150,
      width: '100%',
      backgroundColor: AppColors.blue
    },
    titleTxt: {
      ...AppFonts.Raleway.bold,
      fontSize: AppFonts.size.large,
      color: AppColors.white,
      textAlign: 'center',
      margin: 20,
    },
    configContentContainer: {
      marginTop: 30,
      height: 400,
      width: '100%',
      ...AppStyles.typContentContainer
    },
    entryContainer: {
      flex: 1,
      padding: 30,
      ...AppStyles.typContentContainer,
    },
    painLevelsContainer: {
      width: '100%',
      marginTop: 30,
    },
    partsContainer: (offset) => {
      return {
        marginLeft: offset,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      };
    },
    partContainer: (selected) => {
      return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...AppFonts.Raleway.bold,
        fontSize: AppFonts.size.medium,
        border: 'none',
        backgroundColor: selected ? AppColors.blue : AppColors.lilac,
        color: selected ? AppColors.lilac : AppColors.blue,
        borderRadius: 18,
        width: 140,
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
    visualizerContainer: {
      ...AppStyles.rowSpace,
      alignItems: 'center',
      width: '100%',
      flex: 1,
    },
    visualizer: {
      height: 300,
    },
    backBtn: {
      ...AppStyles.closeBtn,
      marginLeft: 15,
      marginTop: 15,
    },
    bodyPartNoteContainer: {
      ...AppStyles.center,
    },
    bodyPartNote: {
      ...AppStyles.rowSpace,
      height: 180,
      width: '100%',
      marginBottom: 30,
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
      ...AppStyles.typContentContainer,
      flex: 1,
      width: '90%',
      paddingTop: 40,
      paddingLeft: 24,
      ...AppFonts.Raleway.bold,
      color: AppColors.blue,
      fontSize: AppFonts.size.medLarge,
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
      ...AppStyles.largeBtn,
      backgroundColor: AppColors.blue,
      color: AppColors.white,
    },
    skipBtn: {
      ...AppStyles.subtleBtn,
      marginTop: 10,
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
      marginBottom: 20,
      resize: 'none',
      boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
    },
    counterText: {
      position: 'relative',
      top: -70,
      left: 200,
      ...AppFonts.Raleway.regular,
      color: AppColors.blue,
    }
}