import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

export default function App() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contador, setContador] = useState(0);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  const handleRegistrarPedido = () => {
    if (!cliente.trim()) {
      setMensaje('Debe ingresar el nombre del cliente');
      setEsError(true);
      return;
    }

    if (!producto.trim()) {
      setMensaje('Debe ingresar un producto');
      setEsError(true);
      return;
    }

    const cantNum = Number(cantidad);
    if (!cantidad.trim() || isNaN(cantNum) || cantNum <= 0 || !Number.isInteger(cantNum)) {
      setMensaje('Ingrese una cantidad válida');
      setEsError(true);
      return;
    }

    const precioNum = Number(precioUnitario);
    if (!precioUnitario.trim() || isNaN(precioNum) || precioNum < 0) {
      setMensaje('El precio unitario no es válido o está vacío');
      setEsError(true);
      return;
    }

    const totalPedido = cantNum * precioNum;

    setMensaje('Pedido registrado correctamente');
    setEsError(false);
    setContador(contador + 1);
    
    setUltimoPedido({
      cliente: cliente.trim(),
      producto: producto.trim(),
      cantidad: cantNum,
      precioUnitario: precioNum,
      total: totalPedido
    });
  };

  const handleLimpiar = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('');
    setEsError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CampoExpress Mosquera</Text>
        <Text style={styles.subtitle}>Registro de pedidos agropecuarios</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Fuentes"
          placeholderTextColor="#888"
          value={cliente}
          onChangeText={setCliente}
        />

        <Text style={styles.label}>Producto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Papa criolla (kg)"
          placeholderTextColor="#888"
          value={producto}
          onChangeText={setProducto}
        />

        <Text style={styles.label}>Cantidad (Unidades):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 5"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        <Text style={styles.label}>Precio Unitario ($):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3000"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={precioUnitario}
          onChangeText={setPrecioUnitario}
        />

        <TouchableOpacity style={styles.btn1} onPress={handleRegistrarPedido}>
          <Text style={styles.btnText}>Registrar pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2} onPress={handleLimpiar}>
          <Text style={styles.btnSecondaryText}>Limpiar formulario</Text>
        </TouchableOpacity>
      </View>

      {mensaje ? (
        <View style={[styles.messageBox, esError ? styles.errorBox : styles.successBox]}>
          <Text style={esError ? styles.errorText : styles.successText}>{mensaje}</Text>
        </View>
      ) : null}

      {ultimoPedido && !esError && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen del último pedido:</Text>
          <Text style={styles.summaryText}>• Cliente: {ultimoPedido.cliente}</Text>
          <Text style={styles.summaryText}>• Producto: {ultimoPedido.producto}</Text>
          <Text style={styles.summaryText}>• Cantidad: {ultimoPedido.cantidad}</Text>
          <Text style={styles.summaryText}>• Precio Unitario: ${ultimoPedido.precioUnitario.toLocaleString()}</Text>
          <Text style={styles.summaryTotal}>• Valor Total: ${ultimoPedido.total.toLocaleString()}</Text>
        </View>
      )}

      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Pedidos válidos en la sesión:</Text>
        <Text style={styles.counterValue}>{contador}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f7f6',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#7f8c8d',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 5.0,
    elevation: 2,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  btn1: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btn2: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#7f8c8d',
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageBox: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#fadbd8',
  },
  successBox: {
    backgroundColor: '#d4efdf',
  },
  errorText: {
    color: '#900c3f',
    fontWeight: 'bold',
  },
  successText: {
    color: '#145a32',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#ebf5fb',
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#aed6f1',
    marginBottom: 15,
  },
  summaryTitle: {
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 2,
  },
  summaryTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 4,
  },
  counterContainer: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 30,
  },
  counterLabel: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  counterValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
});