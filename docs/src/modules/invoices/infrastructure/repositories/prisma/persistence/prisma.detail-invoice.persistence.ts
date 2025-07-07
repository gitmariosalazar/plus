import { Injectable } from '@nestjs/common';
import { InterfaceDetailInvoiceRepository } from 'src/modules/invoices/domain/contracts/detail-invoice.interface.repository';
import { DetailInvoiceResponse } from 'src/modules/invoices/domain/schemas/dto/response/detail-invoice.response';
import { DetailInvoiceModel } from 'src/modules/invoices/domain/schemas/model/detail-invoice.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaDetailInvoiceAdapter } from '../adapters/prisma.detail-invoice.adapter';

@Injectable()
export class DetailInvoicePrismaImplementation
  implements InterfaceDetailInvoiceRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    detailInvoice: DetailInvoiceModel,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      const detailInvoiceCreated =
        await this.prismaService.detailInvoice.create({
          data: {
            process: {
              connect: {
                id_process: detailInvoice.getProcess().getIdProcess(),
              },
            },
            total_value: detailInvoice.getTotalValue(),
            invoice_number: detailInvoice.getInvoiceNumber(),
            entity: {
              connect: {
                id_entity: detailInvoice.getEntity().getIdEntity(),
              },
            },
            description: detailInvoice.getDescription(),
            emission_date: detailInvoice.getEmissionDate(),
            expiration_date: detailInvoice.getExpirationDate(),
            email_responsibility: detailInvoice.getEmailResponsability(),
            pay_type: {
              connect: {
                id_pay_type: detailInvoice.getTypePayment().getIdTypePayment(),
              },
            },
            document: {
              connect: {
                id_document: detailInvoice.getDocument().getIdDocument(),
              },
            },
            status: {
              connect: {
                id_status: detailInvoice.getStatus().getIdStatus(),
              },
            },
          },
          include: {
            process: {
              include: {
                entity: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
            entity: true,
            pay_type: true,
            document: {
              include: {
                type_document: true,
                process: {
                  include: {
                    entity: true,
                    status: {
                      include: {
                        type_status: true,
                      },
                    },
                  },
                },
              },
            },
            status: {
              include: {
                type_status: true,
              },
            },
          },
        });

      return PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse(
        detailInvoiceCreated,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idDetailInvoice: number,
    detailInvoice: DetailInvoiceModel,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      const detailInvoiceUpdated =
        await this.prismaService.detailInvoice.update({
          where: {
            id_detail_invoice: idDetailInvoice,
          },
          data: {
            process: {
              connect: {
                id_process: detailInvoice.getProcess().getIdProcess(),
              },
            },
            total_value: detailInvoice.getTotalValue(),
            invoice_number: detailInvoice.getInvoiceNumber(),
            entity: {
              connect: {
                id_entity: detailInvoice.getEntity().getIdEntity(),
              },
            },
            description: detailInvoice.getDescription(),
            emission_date: detailInvoice.getEmissionDate(),
            expiration_date: detailInvoice.getExpirationDate(),
            email_responsibility: detailInvoice.getEmailResponsability(),
            pay_type: {
              connect: {
                id_pay_type: detailInvoice.getTypePayment().getIdTypePayment(),
              },
            },
            document: {
              connect: {
                id_document: detailInvoice.getDocument().getIdDocument(),
              },
            },
            status: {
              connect: {
                id_status: detailInvoice.getStatus().getIdStatus(),
              },
            },
          },
          include: {
            process: {
              include: {
                entity: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
            entity: true,
            pay_type: true,
            document: {
              include: {
                type_document: true,
                process: {
                  include: {
                    entity: true,
                    status: {
                      include: {
                        type_status: true,
                      },
                    },
                  },
                },
              },
            },
            status: {
              include: {
                type_status: true,
              },
            },
          },
        });

      return PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse(
        detailInvoiceUpdated,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByDocumentId(idDocument: number): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          document: {
            id_document: idDocument,
          },
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByEmailResponsability(
    emailResponsability: string,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          email_responsibility: emailResponsability,
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByEmissionDate(
    emissionDate: Date,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          emission_date: new Date(emissionDate),
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByEntityId(idEntity: number): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          entity: {
            id_entity: idEntity,
          },
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idDetailInvoice: number,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      const detailInvoice = await this.prismaService.detailInvoice.findUnique({
        where: {
          id_detail_invoice: idDetailInvoice,
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      if (!detailInvoice) return null;

      return PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse(
        detailInvoice,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByInvoiceNumber(
    invoiceNumber: string,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      const detailInvoice = await this.prismaService.detailInvoice.findFirst({
        where: {
          invoice_number: invoiceNumber,
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      if (!detailInvoice) return null;

      return PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse(
        detailInvoice,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          process: {
            id_process: idProcess,
          },
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByStatusId(idStatus: number): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          status: {
            id_status: idStatus,
          },
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByTypePaymentId(
    idTypePayment: number,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.prismaService.detailInvoice.findMany({
        where: {
          pay_type: {
            id_pay_type: idTypePayment,
          },
        },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          entity: true,
          pay_type: true,
          document: {
            include: {
              type_document: true,
              process: {
                include: {
                  entity: true,
                  status: {
                    include: {
                      type_status: true,
                    },
                  },
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return detailInvoices.map(
        PrismaDetailInvoiceAdapter.fromDetailInvoiceWithRelationsToDetailInvoiceResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async existsById(idDetailInvoice: number): Promise<boolean> {
    try {
      const existsById = await this.prismaService.detailInvoice.findUnique({
        where: {
          id_detail_invoice: idDetailInvoice,
        },
      });
      return !!existsById;
    } catch (error) {
      throw error;
    }
  }

  async delete(idDetailInvoice: number): Promise<boolean> {
    try {
      const deleted = await this.prismaService.detailInvoice.delete({
        where: {
          id_detail_invoice: idDetailInvoice,
        },
      });
      return !!deleted;
    } catch (error) {
      throw error;
    }
  }
}
