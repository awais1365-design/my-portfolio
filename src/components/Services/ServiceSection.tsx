import { serviceData } from '../../appData'
import SectionHeading from '../SectionHeading/SectionHeading'
import ServiceCard from './ServiceCard'

const ServiceSection = () => {
  return (
    <section id="services" className="my-14">
      <SectionHeading
        title="// Services / Offers:"
        subtitle="I provide a comprehensive range of development services designed to deliver high-quality code and keep you ahead of the competition."
      />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            shortDescription={service.shortDescription}
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceSection
