import AppColors from 'Common/AppColors';
import AppConst from 'Common/AppConst';
import AppStyles from 'Common/AppStyles';
import AppFonts from 'Common/AppFonts';


export default {
    container: {
      ...AppStyles.fill,
      paddingTop: 80
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '100%'
    },
    leftContentContainer: {
      flex: 1,
      margin: 30,
      backgroundColor: 'white',
      padding: 30,
      ...AppStyles.typContentContainer,
    },
    rightContentContainer: {
      flex: 1,
      margin: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

}