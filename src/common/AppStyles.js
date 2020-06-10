import AppFonts from 'Common/AppFonts';
import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

export default {
  fill: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  center: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  typContentContainer: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 40,
    borderStyle: 'solid',
    borderWidth: 0.25,
    borderColor: AppColors.blue,
    boxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
  },
  closeBtn: {
    ...AppFonts.Raleway.xBold,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    fontSize: AppFonts.size.xLarge,
    backgroundColor: AppColors.blue,
    border: 'none',
    boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  largeBtn: {
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.medSmall,
    border: 'none',
    boxShadow: `0px 2px 2px rgba(0,0,0,0.15)`,
    height: 50,
    width: 120,
    borderRadius: 10,
  },
  typBoxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
}