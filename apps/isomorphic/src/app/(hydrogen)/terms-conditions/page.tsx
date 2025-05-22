import PageHeader from '@/app/shared/page-header';
import React from 'react';
const pageHeader = {
    title: 'Términos y Condiciones',
    breadcrumb: [
        {
            href: '/',
            name: 'Home',
        },
        {
            name: 'terminos y condiciones',
        },
    ],
};

const TerminosCondiciones: React.FC = () => {
    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <div style={{
                fontFamily: 'Arial, sans-serif',
                lineHeight: '1.6',
                margin: '20px',
                padding: '20px',
                backgroundColor: '#f4f4f4',
                color: '#333',
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>

                <h1 style={{ color: '#0056b3', fontSize: '24px', marginBottom: '20px' }}>
                    Términos y Condiciones
                </h1>

                <p>
                    A continuación, presentamos los términos y condiciones aplicables a los Usuarios del Software en virtud de los cuales se permite el uso y acceso a los servicios de este. Los términos y condiciones describirán la relación contractual entre usted y la Compañía propietaria del Software (en adelante, la "Compañía"). En ellos explicaremos los derechos y obligaciones que adquieren los Clientes mediante el uso de los servicios del software, las reglas bajo las cuales se mantendrá la relación de manera directa. En caso de aceptación electrónica expresa de los presentes términos y condiciones, usted en calidad de cliente manifiesta su consentimiento y aceptación. Mediante la aceptación, los clientes declaran que tienen capacidad jurídica y las facultades necesarias para obligarse de acuerdo con los presentes términos y condiciones. En caso de que quien utilice los servicios de software, o lo haga a nombre de una persona jurídica o de un tercero, dicha persona garantiza que está plenamente facultada para obligar y/o representar a dicha entidad. Sin perjuicio de lo anterior, y previa solicitud expresa y por escrito del cliente, la Compañía podrá enviar copia electrónica de los términos y condiciones que se exponen en este instrumento.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 1. Definiciones
                </h2>

                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li><strong>"Cliente"</strong>: es aquella persona que solicita y adquiere el servicio de software que se encuentra regulado con los presentes términos y condiciones.</li>
                    <li><strong>"Mantenimiento"</strong>: se entiende como los tiempos de inactividad o interrupciones del servicio, derivadas del mantenimiento técnico, operativo y/o tecnológico que la Compañía requiera realizar y que pueden incluir, pero no se limitan, a: (i) ventanas de mantenimiento, entendiéndose como la modificación o reparaciones de infraestructura del servicio; (ii) mantenimiento programado por el cliente, en donde se realiza el mantenimiento de la configuración del servicio, el cual ha sido previamente solicitado por el cliente y, por tanto, ha sido objeto de programación conjunta y previa. Esta configuración puede responder a eventos de actualización del hardware y software; y (iii) mantenimiento de emergencia, el cual refiere a los mantenimientos críticos no planificados para la seguridad y el desempeño de la configuración del software, sin los cuales los estándares de los servicios no se cumplirían.</li>
                    <li><strong>"Tarifa"</strong>: refiere al valor y/o pago mensual a cargo del cliente que reconoce a la Compañía como contraprestación del uso del software, conforme a las especificaciones descritas en este instrumento.</li>
                    <li><strong>"Partes"</strong>: significa conjuntamente a la Compañía y el cliente.</li>
                    <li><strong>"Persona"</strong>: significa cualquier persona natural o persona jurídica, privada o pública, o cualquier otra entidad con personería jurídica.</li>
                    <li><strong>"Plan"</strong>: Significa aquel paquete de servicios ofrecidos por la Compañía, cuya tarifa puede variar de acuerdo con diferentes condiciones del servicio.</li>
                    <li><strong>"Servicio(s)"</strong>: significa los servicios prestados para el funcionamiento del software.</li>
                    <li><strong>"Software"</strong>: Es el desarrollo tecnológico generado por la Compañía que permite la prestación de los servicios.</li>
                </ul>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 2. Objeto, Servicios y Especificaciones de los Servicios
                </h2>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    2.1. Objeto
                </h3>
                <p>
                    Al contratar el software, el cliente obtiene una licencia no exclusiva, no transferible y limitada para usar el software según lo permitido por estos Términos y Condiciones. La licencia es válida a partir de la fecha de su contratación y se mantendrá vigente hasta la fecha que se encuentre descrita en el contrato con el cliente considerando las necesidades de este.
                </p>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    2.2. Requisitos para acceder a los servicios
                </h3>
                <p>
                    Para que los clientes puedan acceder a los servicios, deben cumplir como mínimo con los siguientes requisitos:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(i) Tener la capacidad jurídica para contratar según la ley ecuatoriana. Contar con los recursos necesarios para pagar la contraprestación por los servicios.</li>
                    <li>(ii) Haber leído y aceptado estos términos y condiciones.</li>
                    <li>(iii) Todos los que la Compañía considere necesarios y sean previamente informados a los clientes.</li>
                </ul>
                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    2.3. Otras condiciones de la prestación del servicio
                </h3>
                <p>
                    La Compañía se compromete a garantizar el nivel de disponibilidad mensual del software. Si el servicio falla, la Compañía garantiza que el acceso al software será restaurado o corregido en un tiempo prudencial, siendo debidamente informado al cliente. En los eventos en los que la prestación del servicio se encuentre en mantenimiento preventivo o correctivo, la Compañía notificará, de ser posible, con al menos 72 horas de antelación, la necesidad de realizar dichas reparaciones o modificaciones. Este Mantenimiento se intentará realizar durante horas no pico, para que la afectación del funcionamiento y funcionalidad del servicio afecte lo menor posible al Cliente.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 3. Vigencia y Suspensión de la Prestación del Servicio
                </h2>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    3.1. Vigencia
                </h3>
                <p>
                    La vigencia de la prestación del servicio refiere al tiempo acordado con cada cliente para que le sean proporcionado los mismos, conforme con los Planes adquiridos, la orden de compra, contrato y/o cualesquiera otros documentos que hagan sus veces.
                </p>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    3.2. Suspensión
                </h3>
                <p>
                    La Compañía cuenta con la potestad de suspender, temporalmente, los servicios, si las actuaciones u omisiones del cliente representan alguna amenaza para el cumplimiento de las disposiciones que aquí se enuncian, o si no se ha realizado el pago de las tarifas de conformidad con lo dispuesto en la Sección 6 de estos términos y condiciones. Sin embargo, de subsanarse o eliminarse las causas que dieron origen a la suspensión, la Compañía reanudará los servicios máximos dentro de los tres (3) días hábiles siguientes a ello.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 4. Licencia de Uso de Software
                </h2>
                <p>
                    Durante la vigencia de la prestación del servicio del que trata la Sección 2 de estos términos y condiciones, y salvo disposición en contrario, el cliente dispondrá de un derecho de uso limitado, no exclusivo, no cedible y oneroso, para acceder y utilizar los servicios de la Compañía. En virtud de esta Licencia de uso, los clientes no podrán utilizar los servicios para finalidades distintas a las ya mencionadas. Con la aceptación de estos términos y condiciones, el cliente manifiesta inequívocamente que esta licencia de uso no involucra servicios adicionales o conexos que no estén descritos en la Sección 2 de este instrumento ni sobre un tiempo o periodo que exceda a aquel solicitado en la orden de compra, contrato o cualquier otro documento suscrito que haga sus veces. Por tanto, una vez termine la vigencia de la prestación de los servicios, la provisión de estos por parte de la Compañía terminará. En aras de lograr una efectiva y debida prestación de los servicios por parte de la Compañía, el Cliente otorga a la Compañía el derecho de uso, procesamiento y transmisión, de contenido – entiéndase, documentos, archivos, datos, gráficos, ilustraciones, imágenes, información, textos– que sea de su propiedad, durante la vigencia del contrato.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 5. Propiedad y Restricciones del Servicio de Software
                </h2>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    5.1. Derechos de Propiedad Intelectual
                </h3>
                <p>
                    Cada una de las Partes será propietaria exclusiva de todos aquellos derechos de propiedad intelectual de los que sea titular o licenciatario legítimo. Por ello, ninguna de las Partes otorga, de manera implícita o expresa, derecho de propiedad o explotación alguno en relación con cualesquiera derechos de propiedad intelectual de la otra Parte. Por ende, todos y cualesquiera derechos de propiedad intelectual que fueren utilizados de cualquier forma por las Partes para la prestación del servicio, seguirán siendo de titularidad de la Parte a la que dichos derechos de propiedad intelectual pertenecieren.
                </p>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    5.2. Restricciones
                </h3>
                <p>
                    El Cliente manifiesta entender que la licencia de uso de la que trata la Sección 4 de estos términos y condiciones, se encuentra sujeta a las siguientes restricciones, a saber:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(a) Las licencias de uso no podrán ser compartidas o utilizadas por más de los usuarios que le hayan sido autorizados al cliente.</li>
                    <li>(b) El cliente no podrá licenciar, vender, alquilar, arrendar, transmitir, ceder, distribuir, mostrar, albergar, subcontratar, revelar o de cualquier otra forma explotar comercialmente u ofrecer o prestar el Servicio y/o aquellos otros productos y/o servicios que son de propiedad de la Compañía.</li>
                    <li>(c) El cliente no podrá modificar, crear obras derivadas, ni realizar actividades de desensamblaje, descompilación o ingeniería inversa sobre cualquier parte del Servicio, o acceder o usar el Servicio con el fin de crear, soportar y/o asistir a una tercera Persona en la construcción y/o soporte de productos o servicios que sean competencia de la Compañía, o que tengan una finalidad similar o idéntica.</li>
                    <li>(d) Salvo por lo expresamente estipulado en el presente instrumento, ninguna parte del servicio puede ser copiada, reproducida, distribuida, publicada, descargada, mostrada, editada o transmitida, en modo alguno o por cualquier medio, incluyendo a título enunciativo mas no limitativo, medios electrónicos, mecánicos, de fotocopiado, grabación y/o cualesquiera otros.</li>
                    <li>(e) El cliente se obliga a prevenir y evitar, en uso de cualesquiera medios considere razonables, que terceros no autorizados tengan acceso a los servicios.</li>
                </ul>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 6. Tarifas
                </h2>
                <p>
                    La Compañía enviará una factura de venta al cliente por los servicios prestados. Una vez se realice el pago, el cliente tendrá acceso a los servicios que ofrece el Software. La Compañía se reserva el derecho de suspender temporal o definitivamente el servicio, cuando se incumplan los pagos, los plazos y las condiciones de pago establecidos en estos términos y condiciones o en la factura. El cliente entiende y acepta que la Compañía se reserva el derecho a eliminar su información si el incumplimiento a las obligaciones y pagos persiste por más de noventa (90) días, sin perjuicio de las copias de seguridad que voluntariamente realice de la información del cliente.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 7. Obligaciones y Prohibiciones de las Partes
                </h2>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    7.1. Obligaciones de los Clientes
                </h3>
                <p>
                    Los clientes se comprometen a cumplir con todas las obligaciones que se expresan en los presentes Términos y Condiciones, así como aquellas que se determinen en otros documentos, incluyendo y sin limitarse a otros contratos que sean celebrados con la Compañía. Además de estas obligaciones, los clientes tendrán las siguientes obligaciones:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(i) Pagar las tarifas por los servicios según el Plan que contraten.</li>
                    <li>(ii) Actualizar la información suministrada respecto de su identidad sobre la cual la Compañía no tiene ninguna responsabilidad en caso de que no se proporcione una identidad clara y exacta.</li>
                    <li>(iii) Dar aviso a la Compañía sobre cualquier irregularidad o ilegalidad que tenga conocimiento que ocurra o eventualmente ocurrirá.</li>
                    <li>(iv) Leer y conocer a cabalidad los presentes Términos y Condiciones.</li>
                    <li>(v) Cumplir con todas las normas expresadas en estos términos y condiciones o en otros documentos.</li>
                </ul>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    7.2. Prohibiciones de los Clientes
                </h3>
                <p>
                    Los clientes se obligan a abstenerse de realizar cualquiera de las siguientes actividades:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(i) Modificar, desensamblar, descompilar o aplicar ingeniería inversa respecto del Software.</li>
                    <li>(ii) Probar, testear, escanear la vulnerabilidad, o tratar de evadir los mecanismos de seguridad implementados en los sitios web, servidores o redes conectadas al software.</li>
                    <li>(iii) Copiar, emular o de cualquier forma reproducir el software.</li>
                    <li>(iv) Reducir o impedir de manera deliberada la accesibilidad, usabilidad u operatividad del software.</li>
                    <li>(v) Transmitir, publicar o promover material o contenido que incentive cualquier conducta que pueda constituir un delito o que pueda generar cualquier tipo de responsabilidad a la Compañía.</li>
                </ul>
                <p>
                    La realización de cualquiera de las prohibiciones especiales del Cliente dará posibilidad a la Compañía a terminar de forma unilateral el contrato, sin necesidad de requerimientos previos, sin perjuicio de los daños y perjuicios a los que hubiere lugar.
                </p>

                <h3 style={{ color: '#0056b3', fontSize: '18px', marginTop: '15px', marginBottom: '8px' }}>
                    7.3. Obligaciones de la Compañía
                </h3>
                <p>
                    En virtud de la naturaleza del servicio que ofrece la Compañía, la misma se obliga a:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(i) Permitir el uso no exclusivo del software.</li>
                    <li>(ii) Proporcionar las condiciones de permanencia para el funcionamiento del Software.</li>
                    <li>(iii) Proveer la infraestructura tecnológica para el correcto funcionamiento de los servicios.</li>
                    <li>(iv) Si la Compañía llega a ser notificada por un cliente acerca de la existencia de información falsa, errónea, inexacta, incompleta o que incumpla con estos términos y condiciones, podrá realizar las averiguaciones e indagaciones pertinentes a fin de corroborar las aseveraciones que fueron conocidas. En caso de evidenciar tales fallas o tener razonable sospecha sobre su veracidad, autenticidad o verificabilidad, podrá deshabilitar la cuenta comunicándolo al cliente.</li>
                </ul>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 8. Garantías, Renuncias y Recursos
                </h2>
                <p>
                    (i) La Compañía garantiza que prestará los servicios de que trata la Sección 2 de este instrumento, en todos sus aspectos sustanciales, tal como se describe en el alcance allí dispuesto. Si los servicios prestados no fueran provistos conforme a la anterior garantía, el cliente deberá notificar por escrito a la Compañía de tal circunstancia, describiendo la deficiencia en los servicios.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 9. Limitación de la Responsabilidad
                </h2>
                <p>
                    En ningún caso la Compañía será responsable por daños indirectos, punitivos, especiales, ejemplares, incidentales, consecuentes o emergentes, o por cualesquiera daños por pérdida de datos, ingresos, beneficios u otras variables en lo que respecta al uso del software, por el incorrecto uso de la solución o por ataques, sabotaje u otras prácticas en contra de la ética o circunstancias ilegales, de fuerza mayor o caso fortuito. Sin perjuicio de lo anterior, y al ser la Compañía un experto en los servicios que presta, procurará contar con las medidas de seguridad informática necesarias para garantizar la protección de los datos y de la información del cliente.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 10. Peticiones, Quejas, Reclamos y Sugerencias
                </h2>
                <p>
                    Las peticiones, quejas, reclamos y sugerencias podrán interponerse a través del correo electrónico: <a href="mailto:info@hsa.com.ec" style={{ color: '#0056b3', textDecoration: 'none' }}>info@hsa.com.ec</a>.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 11. Exenciones de Responsabilidad de la Compañía
                </h2>
                <p>
                    La Compañía informa a los clientes que quedará exenta de responsabilidad cuando:
                </p>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                    <li>(i) Los clientes proporcionen datos de identidad o información incorrectos, inexactos, no actualizados o falsos, y en particular, aunque de modo no exclusivo ni limitativo, por daños y perjuicios de cualquier naturaleza que se puedan deber a suplantación de personalidad de un tercero, efectuada por un cliente en cualquier clase de comunicación o transacción realizada a través del software.</li>
                    <li>(ii) Cuando se produzca suspensión, interrupción o corte de los servicios debido a mantenimiento correctivo o preventivo.</li>
                    <li>(iii) Cuando se deba realizar modificaciones urgentes que sean necesarias en el software por causas ajenas a la voluntad de la Compañía en casos de congestionamiento de magnitud en las líneas o señales, casos de fuerza mayor o fortuitos atribuibles a la naturaleza, a las condiciones atmosféricas, a altas o bajas en el voltaje del sistema eléctrico y otros de similar naturaleza.</li>
                    <li>(iv) Por virus importados a través de la red o cualquiera sea su origen.</li>
                    <li>(v) Por el uso inadecuado de los servicios por parte del cliente, ya sea por desconocimiento del uso, mala configuración, fallas técnicas de acceso u otras similares en los equipos de propiedad de los clientes.</li>
                    <li>(vi) Por cualquier costo, perjuicio o daño que sea causado a los clientes, como consecuencia de la utilización indebida de los servicios por personas ajenas al Software.</li>
                    <li>(vii) Por las infracciones de derechos de propiedad intelectual efectuadas por los clientes, quienes se atribuyan la condición de derecho habientes, ya sea como titulares o licenciatarios de tales derechos, o quienes presuman contar con cualquier tipo de autorización para su uso.</li>
                </ul>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 12. Propiedad Intelectual
                </h2>
                <p>
                    El software, las soluciones y los diseños, gráficos, textos, imágenes, código fuente y código objeto, modelo de uso y demás contenido al que los clientes tienen acceso, son de propiedad de la Compañía y están protegidos por la propiedad intelectual e industrial según corresponda. Los signos distintivos, tales como marcas, nombres comerciales, logotipos, y todos los componentes de los signos distintivos de la Compañía, son propiedad exclusiva de la misma, por lo cual los clientes no tienen el derecho a usar las marcas sin autorización. La utilización de los aplicativos y del software por parte de los clientes no implica cesión alguna de los derechos de propiedad industrial y de derechos de autor de la Compañía sobre tales contenidos, ni sobre el software. Los usos autorizados estarán delimitados por los presentes términos y condiciones, la finalidad natural y funcional del software y la relación legal entre los clientes y la Compañía. Los usos conferidos deben interpretarse de manera restrictiva. Los clientes y cualquier tercero deben abstenerse de extraer y/o reutilizar partes del contenido sin el consentimiento previo y expreso de la Compañía y/o sus respectivos titulares, so pena de indemnizar a la Compañía por cualquier daño o perjuicio causado con el incumplimiento de esta sección.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 13. Resolución de Conflictos
                </h2>
                <p>
                    Los clientes aceptan que para cualquier divergencia o discrepancia que se presente durante el uso del software, el cliente y la Compañía dispondrán de un término de treinta (30) días calendario, contados a partir de la fecha del reclamo, para solucionar sus diferencias acudiendo a la negociación directa o a la conciliación. Si pasado este tiempo, no se puede llegar a ningún acuerdo, tanto el cliente como la Compañía, son libres de acudir a la justicia ordinaria.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 14. Tratamiento de Datos Personales
                </h2>
                <p>
                    Con la aceptación de estos términos y condiciones, el cliente manifiesta conocer que el tratamiento de los datos personales a los que tenga acceso la Compañía en desarrollo de la prestación del servicio, se regulará por su Política de Tratamiento de Datos Personales, la cual se encuentra en la siguiente URL: <a href="#" style={{ color: '#0056b3', textDecoration: 'none' }}>Política de Tratamiento de Datos</a>.
                </p>

                <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
                    Sección 15. Ley Aplicable y Jurisdicción
                </h2>

                <p>
                    Los presentes términos y condiciones, y todos sus derechos, obligaciones, condiciones y términos se interpretarán, regirán y aplicarán de conformidad con las leyes aplicables de la República del Ecuador. En el mismo sentido, la resolución de cualquier conflicto o asunto relacionado con el presente instrumento, se someterá a la jurisdicción de los tribunales competentes de la República del Ecuador, renunciando a cualquier otro fuero que pueda resultar competente.
                </p>

                <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    <strong>Vigencia desde:</strong> 30 de Junio de 2024.
                </p>
            </div>
        </>
    );
};

export default TerminosCondiciones;