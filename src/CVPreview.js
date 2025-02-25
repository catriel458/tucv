import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
      },
      header: {
        flexDirection: 'row',
        marginBottom: 30,
        paddingBottom: 20,
      },
      headerLeft: {
        flex: 1,
        paddingRight: 30,
      },
      headerRight: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
      },
      name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 15,
        letterSpacing: 1,
      },
      contactContainer: {
        marginTop: 15,
        borderTop: '1px solid #E2E8F0',
        paddingTop: 15,
      },
      contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      contactIcon: {
        width: 25,
        textAlign: 'center',
        fontSize: 12,
        color: '#2563EB',
      },
      contactText: {
        fontSize: 12,
        color: '#4a5568',
        marginLeft: 10,
        letterSpacing: 0.5,
        fontFamily: 'Helvetica',
      },
      divider: {
        borderBottomWidth: 2,
        borderBottomColor: '#2563EB',
        marginVertical: 20,
      },
      sectionTitle: {
        fontSize: 16,
        color: '#2563EB',
        marginBottom: 15,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
  presentacion: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 25,
    lineHeight: 1.8,
    textAlign: 'justify',
    paddingRight: 20,
  },
  experienceItem: {
    marginBottom: 20,
    paddingLeft: 15,
    borderLeft: '3px solid #BFDBFE',
  },
  empresa: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  tiempo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  tareas: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 1.6,
    paddingRight: 20,
  },
  educacionItem: {
    marginBottom: 15,
    paddingLeft: 15,
  },
  institucion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  titulo: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  estado: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  conocimientos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingLeft: 15,
  },
  conocimientoItem: {
    fontSize: 12,
    backgroundColor: '#EBF4FF',
    padding: '8 16',
    borderRadius: 20,
    color: '#2563EB',
    marginRight: 10,
    marginBottom: 10,
  },
});
const CVDocument = ({ datos }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>
              {datos.datosPersonales.nombre} {datos.datosPersonales.apellido}
            </Text>
            
            <View style={styles.contactContainer}>
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>Tel: </Text>
                <Text style={styles.contactText}>
                  {datos.datosPersonales.celular.replace(/=/g, '')} {/* Eliminar caracteres no deseados */}
                </Text>
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>Mail: </Text>
                <Text style={styles.contactText}>
                  {datos.datosPersonales.correo}
                </Text>
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>Zona: </Text>
                <Text style={styles.contactText}>
                  {datos.datosPersonales.ciudad.replace(/=/g, '')} {/* Eliminar caracteres no deseados */}
                </Text>
              </View>
            </View>
          </View>
          
          {datos.imagen && (
            <Image
              style={styles.headerRight}
              src={datos.imagen}
            />
          )}
        </View>
  
        <View style={styles.divider} />

      {datos.datosPersonales.presentacion && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profesional</Text>
          <Text style={styles.presentacion}>{datos.datosPersonales.presentacion}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
        {datos.experiencia.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.empresa}>{exp.empresa}</Text>
            <Text style={styles.tiempo}>{exp.tiempo}</Text>
            <Text style={styles.tareas}>{exp.tareas}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formación Académica</Text>
        {datos.educacion.map((edu, index) => (
          <View key={index} style={styles.educacionItem}>
            <Text style={styles.institucion}>{edu.institucion}</Text>
            <Text style={styles.titulo}>{edu.titulo}</Text>
            <Text style={styles.estado}>{edu.estado}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conocimientos y Habilidades</Text>
        <View style={styles.conocimientos}>
          {datos.conocimientos.map((conocimiento, index) => (
            <Text key={index} style={styles.conocimientoItem}>
              {conocimiento}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default CVDocument;