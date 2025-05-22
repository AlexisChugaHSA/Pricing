'use client'
import PageHeader from '@/app/shared/page-header';
import React from 'react';

const pageHeader = {
  title: 'Políticas de Privacidad',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'políticas de privacidad',
    },
  ],
};

const PoliticasPrivacidad: React.FC = () => {
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
          Política de Privacidad
        </h1>

        <p>
          La presente Política se actualizó por última vez el 26 de marzo de 2024. En <strong>High Systems Analytics</strong> (en adelante "Nosotros" o "HSA"), estamos comprometidos en mantener la privacidad de nuestros clientes y potenciales clientes (en adelante "Cliente") conforme esta Política de Privacidad (en adelante "Política"); en especial, en aquella relación o transacciones que se puedan generar a través del portal web de HSA, para tal finalidad, hemos desarrollado una Política de Privacidad.
        </p>

        <p>
          Esta Política expone los principios consagrados en la Constitución de la República del Ecuador, Ley Orgánica de Protección de Datos Personales ("LOPDP"), su Reglamento General (RGLOPDP) y la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos.
        </p>

        <p>
          El presente instrumento se aplica a las relaciones comerciales e informativas que se generen a través de nuestro portal web. Entendemos que los clientes utilizan nuestros canales electrónicos, como el Sitio Web, para diversas actividades, como el contacto con nosotros, descarga de información, búsqueda de servicios debidamente detallados, entre otros.
        </p>

        <p>
          Al utilizar nuestros servicios en el Sitio Web, los clientes ingresan información privada y datos personales. Esta Política de Privacidad tiene como objetivo ayudarles a comprender qué datos recopilamos, por qué los recopilamos y cómo los utilizamos. También se detallan las medidas de seguridad implementadas para proteger dicha información.
        </p>

        <p>
          Al acceder, usar y proporcionar sus datos a través del Sitio Web, usted autoriza a HSA para que de forma libre y voluntaria efectué a su discreción el tratamiento de datos personales, crediticios y/o datos no públicos propios y/o de mi representado (en adelante "datos"), incluyendo aquellos que pueda enviar y/o entregar a posteriori o que HSA llegare a conocer, recibir y/o acceder por cualquier medio, así como el acceso, uso, tratamiento y recolección de datos que se realice este Sitio Web, acepta esta Política y las prácticas que se detallan a continuación, deslindando de toda responsabilidad a HSA por el contenido de la misma, asumiendo que toda la información es de su exclusiva propiedad, siendo el titular de la misma y, no por interpuesta persona, por lo que cualquier información errónea, incompleta, falsa y/o utilizada con fines fraudulentos, doloso o similar no genera responsabilidad alguna a HSA, a sus socios, personeros, colaboradores y Clientes.
        </p>

        <p>
          HSA es responsable de la base de datos que se genera a través de la interacción con nuestro Sitio Web. Puede comunicarse con nosotros al teléfono al correo electrónico <a href="mailto:info@hsa.com.ec" style={{ color: '#0056b3', textDecoration: 'none' }}>info@hsa.com.ec</a>.
        </p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
          Información proporcionada por el cliente y su aceptación
        </h2>

        <p>
          La información que HSA recopila es aquella que el Cliente ingresa para acceder e interactuar con los distintos servicios que contiene el Sitio Web. El tratamiento que damos a esta información se ajusta a lo establecido en la LOPDP y su Reglamento. En consecuencia, al acceder al Sitio Web y continuar en él, usted de forma clara y expresa acepta y consciente en la entrega y uso de información poniéndola a disposición de Nosotros.
        </p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Información que recibe y almacena HSA</h2>

        <p>La información, comunicación y datos (“datos”) recopilada acerca de usted que es proporcionada de forma directa y/o indirecta a través de cualquier medio incluyendo: formularios, cuestionarios, Sitios web y otros documentos la cual será tratada conforme esta Política, es aquella que usted proporciona al momento de entregar información con sus datos personales en el Sitio Web. Tal información incluye datos como: nombres, apellidos, correo electrónico.</p>

        <p>El Sitio Web contiene una descripción de los servicios ofertados que permite al cliente contactarse para solicitar mayor información proporcionando los datos previamente descritos.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Información obtenida de terceros e información pública</h2>

        <p>HSA está en capacidad de recopilar información a través de bases públicas, llamadas telefónicas. Por lo tanto, usted declara y acepta que la información que sea recopilada y/o tratada por Nosotros, por cualquiera de estos medios, es de su propiedad y fidedigna, autorizando a HSA su uso para los fines referidos en la presente Política.</p>

        <p>Terceras partes nos podrían proporcionar información adicional sobre usted, incluidas las siguientes: fuentes de referencia, datos de contacto, entre otros. Entidades con fines de prevención de fraude, nos podrían proporcionar información relacionada con la identidad y otros.</p>

        <p>Además, accederemos a información basada en la ubicación o recopilaremos marcadores de ubicación de su dispositivo móvil o basados en su dirección IP. Utilizaremos esta información para proporcionarle notificaciones relacionadas con nuestra oficina, información sobre devoluciones, ofertas locales u otros datos que pensemos que serán útiles para ofrecerle mejores servicios. No utilizamos esta información para localizarle de forma específica por ninguna otra razón que no sea la de prestarle nuestros servicios. Con su consentimiento, nuestra aplicación utilizará la cámara de su dispositivo. Si nos ha permitido utilizar su información de ubicación o la cámara de su dispositivo en el pasado y desea anular este permiso, modifique los ajustes en su dispositivo.</p>

        <p>Nuestro Sitio Web recoge y almacena de forma automática información sobre la actividad de sus Usuarios/Clientes. Tal información puede incluir la URL de la que provienen (estén o no en el Sitio Web de HSA), a qué URL acceden seguidamente, qué navegador están utilizando, y sus direcciones IP, las páginas visitadas, cookies y las búsquedas realizadas.</p>

        <p>Para que el Sitio Web funcione de forma correcta se utilizan cookies propias y de terceros. Ver política de cookies.</p>

        <p>Además, sus datos son utilizados en recolección, conservación y divulgación entregada o recibida por cualquier medio, incluyendo diferentes canales electrónicos y físicos que utiliza HSA para el desarrollo de sus actividades, comercio o transacciones.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Almacenamiento y protección de la información</h2>

        <p>La Información personal es recolectada y almacenada en servidores utilizados por Nosotros con fines de respaldo o back up de información, para Recuperación en Caso de Desastres Tecnológicos. En consecuencia, usted, como cliente de HSA y/o usuario del Sitio Web, reconoce y declara que consiente con los procedimientos de almacenamiento y protección de información implementados por HSA.</p>

        <p>Nosotros resguardamos su Información Personal de acuerdo a estándares y procedimientos de seguridad y confidencialidad señalados en Ecuador. HSA NO garantiza la seguridad de la información. HSA realizará a su criterio los actos para disminuir o minimizar brechas de seguridad o similares y cumple con la normativa nacional aplicable.</p>

        <p>HSA ha adoptado las medidas necesarias para mantener el nivel de seguridad requerido, según la naturaleza de los datos personales tratados y las circunstancias del tratamiento, con el objeto de evitar, en la medida de lo posible y siempre según el estado de la técnica, su alteración, pérdida, tratamiento o acceso no autorizado. El Cliente reconoce de forma expresa que los datos personales de los usuarios de HSA que sean tratados durante el desarrollo del contrato y/o relación contractual son responsabilidad exclusiva de Nosotros, por lo que el Cliente no deberá tratarlos para otras finalidades que no sean las de contacto para la prestación del servicio que contraten de recogida y entrega de los productos requeridos.</p>

        <p>Sin embargo, HSA no tendrá responsabilidad alguna por los actos o hechos que se pudieran derivar de interferencias, interrupciones, virus informáticos, o fallas al funcionamiento del sistema, que pudiera derivarse por intromisiones ilegítimas de terceros, bloqueos en el funcionamiento operativo, o por fallas o deficiencias de sobrecarga en el sistema por virus de software o archivos o programas diseñados para interrumpir, destruir o limitar la integridad y/o funcionalidad de cualquier software computacional o hardware o equipo asociado con este Sitio. HSA se compromete a velar por la exactitud, la actualización y el contenido del Sitio. Mediante esta Política, HSA garantiza al Cliente y/o Usuario que aplica y aplicará las medidas adecuadas de protección y queda obligado a respetar la legislación por su condición de encargado de tratamiento o similar, a destruir los datos cuando la finalidad se haya cumplido y, en todo caso, cuando finalice la relación con HSA.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>¿Cómo utilizamos sus datos?</h2>

        <p>Utilizamos la información que recopilamos de usted o sobre usted para brindarle nuestros servicios para los siguientes fines:</p>

        <ul>
          <li>Proporcionar servicio de atención al cliente relacionado con sus interacciones con nosotros o para responder a su consulta.</li>
          <li>Compartir sus datos con terceros para prevenir el fraude y proteger nuestros intereses y derechos comerciales, así como la privacidad, la seguridad y la propiedad, o los de un colectivo; haremos esto para cobrar facturas o valores sin pagar.</li>
          <li>Compartir sus datos con terceros de forma que podamos buscar soluciones o limitar los daños con los que tratamos, o bien aplicar las condiciones de cualquier contrato y/o política. También compartiremos sus datos con terceros si se atenta contra los derechos de otro individuo. Con su consentimiento podemos brindarle los siguientes servicios: Ofrecerle servicios más apropiados para satisfacción de sus necesidades, por lo cual podremos requerir información adicional de sus datos personales. Enviarle mensajes con comunicaciones urgentes.</li>
        </ul>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Retención de sus datos</h2>

        <p>Conservamos su información personal durante el tiempo que necesitamos para cumplir con nuestros objetivos. Para los fines de marketing conservamos datos vinculados a cookies y otros identificadores en línea hasta un máximo de tres años. Asimismo, conservamos otra información de marketing, como datos asociados al número celular o por correo electrónico.</p>

        <p>Consultas relacionadas con el servicio de atención al cliente: conservamos las consultas generales durante un año. Conservamos facturas por siete años. Disputas y cumplimiento de la ley: si nos vemos involucrados en litigios o investigaciones gubernamentales o de organismos reguladores, conservamos los datos a lo largo de todo en periodo de litigio o investigación y durante los siguientes cinco años. Si un acuerdo establece que debemos conservar los datos durante más tiempo, entonces lo haremos durante el periodo necesario para aplicar el acuerdo. Si proporcionamos datos a las autoridades, mantenemos un registro de ello durante un año después de la finalización de la investigación.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Propiedad intelectual</h2>

        <p>Todos los contenidos incluidos en este sitio, como textos, material gráfico, imágenes, logotipos, íconos de botones, códigos fuente, imágenes, audio clips, descargas digitales y compilaciones de datos, son propiedad de HSA o de páginas públicas que son extraídos del internet que hace referencia a la marca para no violar los derechos de autor, y están protegidos por las leyes ecuatorianas e internacionales sobre propiedad intelectual.</p>

        <p>Usted no podrá vender, ceder, comercializar, transmitir, distribuir, alterar, reproducir, transformar, publicar, copiar, editar, adaptar, u obtener cualquier ventaja económica de la información publicada en este Sitio, sin autorización previa y por escrito de HSA. Todos los derechos no expresamente otorgados en este documento son reservados por HSA o sus cesionarios, proveedores, editores, titulares de derechos u otros proveedores de contenidos. Ningún producto, imagen o sonido pueden ser reproducidos, duplicados, copiados, vendidos, revendidos, visitados o explotados para ningún fin, en todo o en parte, sin el consentimiento escrito previo de Nosotros. No se puede enmarcar o utilizar técnicas de enmarcación para encerrar alguna marca comercial, logotipo u otra información registrada o patentada (incluyendo imágenes, texto, disposición de páginas, o formulario) de HSA, sin nuestro consentimiento escrito previo. Tampoco se puede usar etiquetas ni ningún otro “texto oculto” que use el nombre o marcas comerciales de HSA, sin autorización escrita previa de esta empresa. Se prohíbe hacer un uso indebido de este sitio o de estas marcas, licencias o patentes. Lo anterior, sin perjuicio de las excepciones expresamente señaladas en la ley.</p>

        <p>HSA respeta la propiedad intelectual de otros. Si crees que tu trabajo ha sido copiado en forma tal que constituye una violación del derecho de propiedad intelectual, contáctate con nosotros.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Con quién compartimos información</h2>

        <h3>Terceros</h3>

        <p>Compartiremos sus datos con terceros como: (1) proveedores de pagos, administración y asistencia técnica u otros socios; (2) nuestros proveedores de servicios. De igual forma, las redes sociales nos permiten compartir información agregada o anónima acerca de nuestros clientes, para que puedan enviar mensajes de publicidad personalizados en nuestro nombre, analizar, mejorar y gestionar nuestros datos, dirigir servicios de análisis móviles, además de mantener y mejorar nuestros servicios (en virtud de los acuerdos de confidencialidad pertinentes); (3) otros.</p>

        <h3>Autoridades gubernamentales</h3>

        <p>Sus datos personales también pueden compartirse con autoridades gubernamentales como se ha descrito.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Preferencias de marketing</h2>

        <p>El Cliente tiene derecho a oponerse al marketing directo, así como a la creación de perfiles con fines de marketing directo. Podrá rechazar las comunicaciones de marketing directo poniéndose en contacto con <a href="mailto:info@hsa.com.ec">info@hsa.com.ec</a> directamente.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Sus derechos y obligaciones</h2>

        <p>Tiene derecho de oposición y rectificación de conformidad con la LOPDP y su Reglamento General, incluso tiene derecho a interponer una reclamación ante un órgano de control en relación con nuestro procesamiento de su información personal y/o la forma en que hemos respondido o gestionado cualquier duda que nos haya planteado, solo una vez que se haya negado su petición concreta y solicitada de forma correcta a Nosotros.</p>

        <p>En caso de querer ejercitar los derechos de acceso, rectificación, cancelación, oposición, limitación y/o portabilidad reconocidos por la normativa vigente de protección de datos de carácter personal, el Cliente sólo deberá solicitar su ejercicio a través de la dirección <a href="mailto:info@hsa.com.ec">info@hsa.com.ec</a> en forma y contenido de acuerdo con la legislación ecuatoriana.</p>

        <p>Nos reservamos el derecho a no permitir el acceso a su información o de limitar sus derechos (si dicha divulgación está prohibida por ley o si se pueden violar los derechos de otra persona). En algunos casos, esto puede significar que podremos conservar su información personal incluso si usted retira su consentimiento cuando esté autorizado o permitido por esta Política o por Ley.</p>

        <p>De conformidad con la legislación ecuatoriana, en especial la LOPDP y su Reglamento General, los datos de carácter personal que sean facilitados a efectos de la celebración y ejecución durante la relación entre ellos serán objeto de tratamiento automatizado y podrán formar parte de los ficheros titularidad de HSA, siendo Nosotros el responsable del fichero (o a quien ella delegue), para las finalidades propias de gestión del servicio ofrecido a través de la plataforma online (esto es, facilitarle a los mensajeros cualquier información que soliciten y gestionar el envío de información comercial y promocional que pueda resultar de su interés), así como para su conocimiento, recopilación, tratamiento y decisiones.</p>

        <p>El Cliente declara conocer y se obliga a cumplir la legislación ecuatoriana en materia de Protección de Datos Personales en el desarrollo de sus respectivas actividades económicas, comprometiéndose a tratar los Datos Personales e información confidencial obtenida durante el desarrollo de su relación con HSA de acuerdo con dicha normativa. Asimismo, el Cliente guardará la más estricta confidencialidad respecto a la información comercial o de negocio de carácter reservado relativa de ella, así como del Cliente y/o usuarios a la que haya tenido acceso de su actividad. El Cliente acepta de manera expresa que pueda ser valorado por colaboradores de HSA, esto es por Nosotros, así como por los comercios que utilicen la Plataforma (que incluye formularios, cuestionarios, redes sociales y otras fuentes de información o de relación con terceros). Toda vez que son los usuarios y/o clientes beneficiarios de la prestación de bienes y/o servicios ofrecida al Cliente.</p>

        <p>Los datos, información y comunicaciones (“datos”) del Cliente podrán ser cedidos, transferidos, prestados o entregados bajo cualquier título o modo a HSA, incluyendo con las personas que HSA mantenga una relación comercial para prestar servicios en nombre de éste. En caso de ceder los datos a empresas que se encuentren fuera del territorio de Ecuador, HSA realizará la transferencia internacional de datos a través de los mecanismos aceptados en la normativa de aplicación.</p>

        <p>HSA, durante el desarrollo de la relación con el Cliente podrá subcontratar con terceros la prestación de determinados bienes y/o servicios, pudiendo el tercero requerir el acceso a Datos Personales gestionados por HSA.</p>

        <p>El Cliente será responsable, durante y posteriormente al vínculo contractual con HSA por las infracciones en que pudiera incurrir en caso de utilizar los datos para una finalidad distinta a la prevista en esta Política y/o por no establecer las medidas necesarias para garantizar la seguridad de los datos recibidos.</p>

        <p>Estos datos serán facilitados a los usuarios que realicen órdenes a través de la Plataforma para que puedan contactar con el Cliente durante la ejecución del mandato otorgado y para poder valorar el servicio ofrecido por el Cliente a través del sistema de excelencia implantado, sin que puedan utilizar sus datos para otras finalidades que las aquí descritas. Sus datos también podrán ser cedidos a terceros. Estos datos se conservarán durante el tiempo de duración de la relación comercial y serán cancelados a los cinco años desde la fecha de finalización de ésta. Esta Política está sometida a la legislación de la República de Ecuador.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Otros términos</h2>

        <p>Si un tribunal encuentra que una parte específica de esta política de privacidad es contraria a derecho, el resto continuará vigente. Cualquier cambio que hagamos a esta política de privacidad en el futuro, serán publicados en esta página y, de ser apropiado, le notificaremos dicho cambio.</p>

        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Legislación aplicable y resolución de disputas</h2>

        <p>El uso de este Sitio y la aplicación de la política de privacidad aquí contenidas, se someterán a las leyes de la República de Ecuador. Cualquier dificultad que se suscite entre las partes de este contrato respecto de la existencia, validez, exigibilidad, resolución, término, interpretación, aplicación, cumplimiento o suscripción del mismo será sometido a la resolución de los tribunales de Quito, D.M.</p>


        <h2 style={{ color: '#0056b3', fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
          Cambios en estas políticas
        </h2>

        <p>
          Cuando sea necesario actualizaremos esta Política sin necesidad de notificación alguna.
        </p>
      </div>
    </>
  );
};

export default PoliticasPrivacidad;