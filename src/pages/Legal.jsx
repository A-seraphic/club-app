import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Legal documents. Structured to reflect CLUB's real (prototype) operation.
   Fields that depend on still-unknown business data are marked [Pendiente]
   so they can be completed before launch. Nothing here is invented. */

function Pending() {
  return <span className="inline-block text-[10px] text-coral bg-coral/10 rounded px-1.5 py-0.5 ml-1 align-middle">Pendiente</span>;
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h2 className="font-display font-bold text-title text-base mb-1.5">{title}</h2>
      <div className="text-sm text-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

const docs = {
  privacy: {
    title: "Política de privacidad y tratamiento de datos personales",
    body: (
      <>
        <Section title="1. Responsable del tratamiento">
          <p>El responsable del tratamiento de los datos personales en CLUB es <Pending /> (nombre legal del operador), con identificación tributaria <Pending />, dirección <Pending /> y correo de privacidad <Pending />.</p>
        </Section>
        <Section title="2. Datos que se recopilan">
          <p>CLUB recopila los datos necesarios para ofrecer el servicio: nombre, nombre de usuario, correo electrónico, ubicación seleccionada, foto de perfil, publicaciones, opiniones, Me gusta, guardados y calificaciones por coronas. Las cuentas empresariales pueden aportar datos comerciales (nombre comercial, logo, descripción, categoría, dirección, horarios, teléfono, sitio web y redes).</p>
        </Section>
        <Section title="3. Finalidad">
          <p>Los datos se utilizan para crear y administrar la cuenta, mostrar y descubrir ofertas, gestionar interacciones sociales (likes, guardados, comentarios y calificaciones), personalizar el contenido según las preferencias y comunicar avisos dentro de la app.</p>
        </Section>
        <Section title="4. Datos obligatorios y opcionales">
          <p>El correo y los datos básicos de la cuenta son obligatorios para usar el servicio. La ubicación, la foto, la biografía y los datos comerciales son opcionales. Las comunicaciones comerciales opcionales requieren consentimiento expreso y no se activan por defecto.</p>
        </Section>
        <Section title="5. Fotografías, publicaciones y opiniones">
          <p>Las imágenes, textos y opiniones que publiques pueden mostrarse a otras personas según tus ajustes de privacidad. Eres responsable de contar con los derechos sobre el contenido que publicas.</p>
        </Section>
        <Section title="6. Información pública y permisos de privacidad">
          <p>Puedes controlar qué ven otras personas en tu perfil (publicaciones, Me gusta, guardados y opiniones) desde Configuración → Privacidad. Ocultar una sección limita su visibilidad, no elimina el contenido.</p>
        </Section>
        <Section title="7. Proveedores externos">
          <p>CLUB utiliza el sistema de autenticación e infraestructura de la plataforma Base44. Otros proveedores externos (analítica, mapas, IA) <Pending /> se documentarán conforme se integren. No se envían datos personales innecesarios a servicios externos.</p>
        </Section>
        <Section title="8. Transferencias internacionales">
          <p>En la medida en que los proveedores procesen datos fuera de Colombia, se informará aquí <Pending /> con las garantías correspondientes.</p>
        </Section>
        <Section title="9. Conservación">
          <p>Los datos se conservan mientras la cuenta esté activa y el tiempo necesario para cumplir las finalidades descritas. Puedes solicitar su eliminación.</p>
        </Section>
        <Section title="10. Medidas de protección">
          <p>Se aplican medidas técnicas y organizativas razonables para proteger los datos. Las contraseñas se gestionan mediante el sistema de autenticación de la plataforma y no se almacenan en texto plano en el cliente.</p>
        </Section>
        <Section title="11. Derechos del titular">
          <p>Puedes ejercer tus derechos de acceso, corrección, actualización, supresión y revocación escribiendo a <Pending />. Responderemos en los plazos legales aplicables.</p>
        </Section>
        <Section title="12. Consultas y reclamaciones">
          <p>Para consultas o reclamaciones puedes contactar al responsable en <Pending /> o acudir a la autoridad de protección de datos competente.</p>
        </Section>
      </>
    ),
  },
  terms: {
    title: "Términos y condiciones de uso de CLUB",
    body: (
      <>
        <Section title="1. Operador y alcance">
          <p>CLUB es operado por <Pending />. Funciona como plataforma de descubrimiento de ofertas y promociones locales, y redirige a los usuarios hacia los negocios. CLUB no participa directamente en la venta, el pago ni la prestación del servicio ofertado, salvo que se indique expresamente.</p>
        </Section>
        <Section title="2. Cuentas">
          <p>Existen cuentas personales y empresariales. Eres responsable de la veracidad de tus datos y del uso de tu cuenta. Las cuentas empresariales permiten publicar y administrar ofertas.</p>
        </Section>
        <Section title="3. Reglas para usuarios">
          <p>Debes usar CLUB de forma lícita y respetuosa. Está prohibido el spam, el fraude, la suplantación, el acoso y cualquier conducta abusiva.</p>
        </Section>
        <Section title="4. Reglas para empresas">
          <p>Las empresas son responsables de la veracidad de sus ofertas: precios, descuentos, vigencia y condiciones reales. Deben contar con los derechos sobre logos, imágenes y textos que publiquen.</p>
        </Section>
        <Section title="5. Publicación y vigencia de promociones">
          <p>Las ofertas deben mostrar precios, descuentos, vigencia y condiciones sustentados por los datos disponibles. Las promociones promocionadas se identifican como tales.</p>
        </Section>
        <Section title="6. Conductas prohibidas y moderación">
          <p>CLUB puede retirar contenido y suspender cuentas que infrinjan estas reglas. Las decisiones de moderación no eliminan críticas legítimas por ser desfavorables.</p>
        </Section>
        <Section title="7. Reportes y retirada de contenido">
          <p>Cualquier usuario puede reportar contenido, comentarios u ofertas engañosas. Los reportes se revisan conforme a estas normas.</p>
        </Section>
        <Section title="8. Sistema de coronas y prevención de abuso">
          <p>La calificación por coronas evalúa la utilidad de una contribución, no a la persona. Un usuario tiene una sola calificación activa por comentario, puede modificarla o retirarla, y no puede calificar sus propias reseñas. El uso del sistema para acosar está prohibido.</p>
        </Section>
        <Section title="9. Responsabilidad">
          <p>CLUB actúa como plataforma de descubrimiento. No garantiza la disponibilidad ni calidad de las ofertas, que son responsabilidad de cada negocio. Esta sección no pretende excluir obligaciones legales que no puedan renunciarse.</p>
        </Section>
        <Section title="10. Planes premium">
          <p>Si se ofrecen planes premium, sus condiciones específicas se detallarán al momento de la contratación <Pending />.</p>
        </Section>
        <Section title="11. Reclamaciones y cambios">
          <p>Para reclamaciones contacta a <Pending />. Estos términos pueden actualizarse; notificaremos los cambios relevantes. La legislación aplicable se confirmará tras revisión legal <Pending />.</p>
        </Section>
      </>
    ),
  },
  cookies: {
    title: "Política de cookies y tecnologías similares",
    body: (
      <>
        <Section title="1. Tecnologías utilizadas">
          <p>CLUB, en su versión web, utiliza almacenamiento local del navegador (localStorage) para guardar preferencias, ajustes de privacidad, likes, guardados y calificaciones por coronas. Esto permite que la app recuerde tu configuración entre sesiones.</p>
        </Section>
        <Section title="2. Categorías">
          <p><strong>Estrictamente necesarias:</strong> el estado de sesión y los datos básicos para el funcionamiento.</p>
          <p><strong>Preferencias:</strong> tema, idioma y preferencias de contenido.</p>
          <p><strong>Analítica / publicidad:</strong> en esta versión no se cargan herramientas de analítica ni publicidad de terceros. Si se añaden, se informará aquí y se requerirá consentimiento para las opcionales.</p>
        </Section>
        <Section title="3. Consentimiento">
          <p>Las tecnologías opcionales no se activan por defecto. Cuando se integren, se mostrará un panel para aceptar, rechazar o configurarlas por categoría, sin casillas premarcadas, y podrás cambiar tu decisión posteriormente.</p>
        </Section>
        <Section title="4. Versión nativa">
          <p>En una versión nativa (iOS/Android), CLUB no utiliza cookies web; emplea el almacenamiento del dispositivo para las mismas funciones de preferencias. No se afirma que utiliza cookies cuando no es así.</p>
        </Section>
        <Section title="5. Gestión">
          <p>Puedes borrar el almacenamiento local desde los ajustes de tu navegador o eliminando tu cuenta en Configuración → Seguridad.</p>
        </Section>
      </>
    ),
  },
};

export default function Legal() {
  const { doc } = useParams();
  const navigate = useNavigate();
  const content = docs[doc];

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-base truncate">{content?.title || "Documento legal"}</h1>
      </header>

      <div className="px-4 py-5">
        {!content ? (
          <p className="text-sm text-muted-foreground">Documento no encontrado.</p>
        ) : (
          <>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-coral/10 mb-4">
              <p className="text-[11px] text-foreground">Este documento es una estructura sujeta a revisión legal. Los campos marcados <Pending /> deben completarse antes del lanzamiento.</p>
            </div>
            {content.body}
            <p className="text-[11px] text-muted-foreground mt-6">Última actualización: pendiente de aprobación legal.</p>
          </>
        )}
      </div>
    </div>
  );
}