import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { transactionStyles as styles } from './styles'; // Importa el archivo de estilos
import { TransactionDTO } from '@/types';

// Función auxiliar para capitalizar la primera letra
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const TransactionReport = ({ transactions }: { transactions: TransactionDTO[] }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.companyName}>MaxAutos</Text>
            <Text style={styles.title}>Registro de Ventas</Text>
            <Text style={styles.subTitle}>Detalles Generales</Text>

            {transactions.map((transaction, index) => (
                <View key={index} style={styles.transactionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Transacción #{index + 1} - {new Date(transaction.date).toLocaleDateString()}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionSubtitle}>Comprador</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.value}>{capitalize(transaction.buyer.name)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>CC:</Text>
                            <Text style={styles.value}>{transaction.buyer.cc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{transaction.buyer.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Teléfono:</Text>
                            <Text style={styles.value}>{transaction.buyer.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionSubtitle}>Vehículo</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Marca:</Text>
                            <Text style={styles.value}>{capitalize(transaction.car.brand)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Modelo:</Text>
                            <Text style={styles.value}>{transaction.car.model}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Línea:</Text>
                            <Text style={styles.value}>{capitalize(transaction.car.line)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Kilometraje:</Text>
                            <Text style={styles.value}>{transaction.car.kilometers.toLocaleString()} km</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Combustible:</Text>
                            <Text style={styles.value}>{capitalize(transaction.car.fuel)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Transmisión:</Text>
                            <Text style={styles.value}>{capitalize(transaction.car.transmission)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Color:</Text>
                            <Text style={styles.value}>{capitalize(transaction.car.color)}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionSubtitle}>Detalles de la Transacción</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Fecha de Venta:</Text>
                            <Text style={styles.value}>{new Date(transaction.date).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Precio:</Text>
                            <Text style={styles.value}>${transaction.car.price.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </Page>
    </Document>
);

export default TransactionReport;
