// globalStyles.js
import { StyleSheet, Platform } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#fff',
    paddingTop: 100
  },
 
    fonts: {
    inter: 'Inter-Black',
    fontSize30: 30,
    fontSize24: 24,
    fontSize16: 16,
    fontSize20: 20,
    fontSize18: 18,
    fontSize14: 14,
    fontSize12: 12,
    fontSize13: 13,
    fontSize10: 10,
    fontSize8: 8,
    fontFamily: 'Inter-Medium'
  },
  normalFonts :{
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter-Medium'
  },
  headingText :{
    fontSize: 25,
    fontFamily: 'Inter-Medium'
  },
  backgroundColor: {
    backgroundColor: '#fff',
    primaryBlue: '#0C225E',
  },
  textColor: {
    blackColor: '#000',
    grayColor: '#E2E2E2',
    blueCOlor: '#7E49FF',
    whiteColor: '#fff'
  },
  input: {
    borderColor: '#000', 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: 10, 
    fontSize: 16,
  },
  normalButton: {
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    maxWidth: 110,
  },
  normalButtonText: {
  },
  simpleButton: {
    backgroundColor: "#FFCE6D",
    color: "#000",
    textAlign: 'center',
    borderRadius:8,
    paddingVertical:3,
    paddingHorizontal:6,
    fontSize:15
  },

  // style components
  drawerTop: {
    height: 180,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: '#0000006b',
    width: '100%',
    height: '100%',
  },
  loading2: {
    zIndex: 99,
    width: '100%',
    height: '100%',
  },
  coinModal: {
    bottom:0,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  containerMain: {
    backgroundColor: "000",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 65,
  },
  mainContainer: {
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  scrollContainerNoContent: {
    paddingBottom: 5,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  topHeader :{
    position: 'absolute',
    zIndex: 10,
    top: 40,
    left: 0,
    width: '100%',
    height: 50,
    paddingVertical: 3,
    paddingHorizontal: 12,
    textAlign: 'center',
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topMobile: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    width: '100%',
    height: 40,
    paddingVertical: 3,
    paddingHorizontal: 12,
    textAlign: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#fff',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    color: '#000',
    fontFamily: 'Inter-Medium'
  },
  addCoin :{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCE6D',
    borderRadius: 24,
    paddingHorizontal: 6
  },
  displayRowbetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  displaycolumn: {
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  normalCard:{
    borderRadius: 8,
    paddingTop: 10,
    paddingHorizontal:20,
    paddingBottom:8,
    alignItems: 'center'
  },
  chip: {
    backgroundColor: '#D0FFF7',
    paddingHorizontal:11,
    paddingVertical: 2,
    borderRadius: 5
  },
  chipText : {
    fontSize: 12,
    fontWeight: 700
  },
  challangeBox: {
    borderRadius:8,
    backgroundColor: '#f6f6f6',
    maxWidth: 180,
    marginRight: 15,
  },
  challangesBox: {
    borderRadius:8,
    backgroundColor: '#f6f6f6',
   marginBottom: 8
  },
  challangeBoxTop: {
    paddingTop: 3,
    paddingHorizontal: 5,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: "center",
    gap: 5,
    paddingBottom:6,
  },
  // challangeschallenger: {
  //   maxWidth: 80
  // },
  challangeFor: {
    minWidth: 115,
    textAlign: 'center'
  },
  challangeBoxBottom: {
    paddingHorizontal: 10,
    paddingVertical:3,
    width: "100%",
    borderRadius:8,
    marginBottom:0
  },
  challangeBoxBottom2: {
    paddingHorizontal: 0,
    paddingVertical:0,
    marginBottom: 0
  },
  rangeabtn : {
    height: 10,
    width: 100,
  },
  width50 : {
    width: '50%',
    textAlign: 'center'
  },
  cover1 : {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#545454',
    padding: 8,
    marginVertical: 10,
    paddingBottom: 0
  },
  listItemText: {
    fontSize: 12,
    lineHeight: 13,
    color: '#000',
    paddingVertical: 0, 
    paddingHorizontal: 0,
    marginBottom: 5,
    paddingTop: 0
  },
  listItemText2: {
    fontSize: 15,
    lineHeight: 16,
}, 
  boxshodowbox: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    width: "100%",
    minHeight: 300,
    borderColor: 1,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  modalBox: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    position: 'relative'
  },
  modalContent: {
        paddingVertical: 5,
    paddingHorizontal: 10,
  },
  closeModal: {
    position: 'absolute',
    top: 3,
    right: 15,
    zIndex: 99
  },
  transBox: {
    marginTop: 5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  transIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 6.5,
    marginRight: 5
  },
  transIcon2: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  rankCount: {
    borderRadius: 12,
    backgroundColor: '#0C225E',
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  rankText: {
    color: '#000',
    fontWeight: '700',
    overflow: 'hidden',
    maxWidth:200
  },
  graySmallButton:{
    fontSize:12,
    paddingVertical:0,
    marginVertical:3,
    marginHorizontal:5
  },
  bottomTabs : {
    backgroundColor: "#fff",
    paddingVertical:15,
    paddingRight:16,
    borderTopWidth: 1,
    borderColor: '#00000026',
    borderStyle: 'solid'
  },
  contactusBox :{
    borderWidth: 1,
    borderColor: '#00000026',
    borderStyle: 'solid',
    borderRadius:8,
    padding:8
  },
  textHeading : {
    textAlign: 'center',
    marginVertical: 5
  },
  textContentHeading: {
    fontSize:18,
    color: '#000',
    fontWeight:'700',
    marginVertical:5
  },
  textContent: {
    fontSize:14,
    color: '#000'
  },
});

export default globalStyles;
