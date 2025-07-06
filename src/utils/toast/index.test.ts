import Toast from 'react-native-toast-message';
import { showErrorToast } from './index';

describe('showErrorToast', () => {
  it('muestra un toast de error con título y mensaje', () => {
    showErrorToast('Error', 'Algo salió mal');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error',
      text2: 'Algo salió mal',
      position: 'top',
      topOffset: 50,
      props: {
        style: { width: '90%', alignSelf: 'center' },
        contentContainerStyle: { paddingVertical: 16, paddingHorizontal: 20 },
        text1Style: { fontSize: 18, fontWeight: 'bold' },
        text2Style: { fontSize: 14 },
      },
    });
  });
});