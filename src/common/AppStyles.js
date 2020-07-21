import AppFonts from 'Common/AppFonts';
import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import color from 'color';

export default {
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },
  columnStart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  columnSpace: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rowStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rowEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rowSpace: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  typContentContainer: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 40,
    borderStyle: 'solid',
    borderWidth: 0.25,
    borderColor: AppColors.blue,
    boxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
  },
  mobileContentContaner: {
    backgroundColor: AppColors.white,
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
  subtleBtn: {
    ...AppFonts.Raleway.bold,
    fontSize: AppFonts.size.small,
    color: AppColors.lightGrey,
    border: 'none',
    background: 'transparent',
    textDecoration: 'underline',
  },
  activeBtn: {
    normalStyle: {
      backgroundColor: AppColors.blue,
      color: AppColors.white,
    },
    hoverStyle: {
      backgroundColor: color(AppColors.blue).darken(0.01).hex(),
      transform: 'scale(0.99) rotate(0.2deg) translateY(1px)',
    },
    activeStyle: {
      backgroundColor: color(AppColors.blue).darken(0.05).hex(),
      transform: 'scale(0.97) rotate(0.5deg) translateY(3px)',
    }
  },
  inactiveBtn: {
    normalStyle: {
      backgroundColor: AppColors.lilac,
      color: AppColors.blue,
    },
    hoverStyle: {
      backgroundColor: color(AppColors.lilac).darken(0.01).hex(),
      transform: 'scale(0.99) rotate(0.2deg) translateY(1px)',
    },
    activeStyle: {
      backgroundColor: color(AppColors.lilac).darken(0.03).hex(),
      transform: 'scale(0.97) rotate(0.5deg) translateY(3px)',
    }
  },
  typBoxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
  typBorder: {
    borderStyle: 'solid',
    borderWidth: 0.25,
    borderColor: AppColors.blue,
  }
}