import AppFonts from 'Common/AppFonts';

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