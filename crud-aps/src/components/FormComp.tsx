import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const clienteSchema = z.object({
    cliente: z.object({
      nome: z.string().min(1, "Por favor, informe um nome válido"),
      nomeFantasia: z.string().optional(),
      cnpj: z.string().min(14, "Por favor, informe um CNPJ válido").max(14, "Por favor, informe um CNPJ válido"),
      email: z.string().email("Por favor, informe um E-mail válido."),
      telefone: z.string().min(15, "Por favor, informe um telefone válido"),
      endereco: z.object({
        cep: z.string().min(8, "Por favor, informe um CEP válido"),
        logradouro: z
          .string()
          .min(1, "Por favor, informe um logradouro válido"),
        bairro: z.string().min(1, "Por favor, informe um bairro válido"),
        cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
        uf: z.string().min(2, "Por favor, informar UF válido").max(2, "Por favor, informar UF válido"),
        complemento: z.string().optional(),
      }),
    }),
  });

type FormData = z.infer<typeof clienteSchema>;

export function FormComp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm<FormData>({
      resolver: zodResolver(clienteSchema),
    });
  
    const onSubmit = (data: FormData) => {
      console.log(data);
      onClose();
      reset();
    };

    const onCancel = () => {
        onClose();
        reset();
      };


    //Erro de acesso no	https://receitaws.com.br/
    const onBlurCNPJ = async () => {
      const cnpj = getValues('cliente.cnpj');

      if (cnpj)
        try {
          const respostaAPI = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
          const cnpjData = await respostaAPI.json();
          console.log(cnpjData)

          if (!cnpjData.erro) {
            setValue('cliente.endereco.bairro', cnpjData.estabelecimento.bairro);
            setValue('cliente.endereco.cep', cnpjData.estabelecimento.cep);
            setValue('cliente.nomeFantasia', cnpjData.estabelecimento.nome_fantasia);
            setValue('cliente.endereco.logradouro', cnpjData.estabelecimento.logradouro);
            setValue('cliente.endereco.cidade', cnpjData.estabelecimento.cidade.nome);
            setValue('cliente.email', cnpjData.estabelecimento.email);
            setValue('cliente.endereco.uf', cnpjData.estabelecimento.estado.sigla);
            setValue('cliente.endereco.complemento', cnpjData.estabelecimento.complemento);
            setValue('cliente.nome', cnpjData.razao_social);
            setValue('cliente.telefone', cnpjData.estabelecimento.telefone);
            
          } else {
            console.log("CNPJ não encontrado")
          }
      } catch (error) {
        console.error("Erro ao buscar CNPJ:", error);
      }


    };

    const onBlurCep = async () => {
      const cep = getValues('cliente.endereco.cep');
      
      if (cep) {
        try {
          const respostaAPI = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const cepData = await respostaAPI.json();
    
          if (!cepData.erro) {
            setValue('cliente.endereco.bairro', cepData.bairro);
            setValue('cliente.endereco.logradouro', cepData.logradouro);
            setValue('cliente.endereco.cidade', cepData.localidade);
            setValue('cliente.endereco.uf', cepData.uf);
          } else {
            console.log("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      }
    };

    return (
        <>
        <Button onClick={onOpen}>Adicionar Cliente</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar conta de usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                                  
              <FormControl isInvalid={!!errors.cliente?.cnpj}>
                  <FormLabel htmlFor="cliente.cnpj" mt={4} mb={1}>CNPJ</FormLabel>
                  <Input maxLength={14} id="cliente.cnpj" placeholder="Digite apenas os números do CNPJ." {...register('cliente.cnpj')} onBlur={onBlurCNPJ}/>
                  {errors.cliente?.cnpj && (
                    <FormErrorMessage>{errors.cliente.cnpj.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.cliente?.nome}>
                  <FormLabel htmlFor="cliente.nome" mt={4} mb={1}>Nome</FormLabel>
                  <Input id="cliente.nome" placeholder="Nome" {...register('cliente.nome')} />
                  {errors.cliente?.nome && (
                    <FormErrorMessage>{errors.cliente.nome.message}</FormErrorMessage>
                  )}
                </FormControl>
    
                <FormControl isInvalid={!!errors.cliente?.nomeFantasia}>
                  <FormLabel htmlFor="cliente.nomeFantasia" mt={4} mb={1}>Nome Fantasia (opcional)</FormLabel>
                  <Input id="cliente.nomeFantasia" placeholder="Nome Fantasia" {...register('cliente.nomeFantasia')} />
                </FormControl>

                <FormControl isInvalid={!!errors.cliente?.email}>
                  <FormLabel htmlFor="cliente.email" mt={4} mb={1}>E-mail</FormLabel>
                  <Input id="cliente.email" placeholder="E-mail" {...register('cliente.email')} />
                  {errors.cliente?.email && (
                    <FormErrorMessage>{errors.cliente.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                
                <FormControl isInvalid={!!errors.cliente?.telefone}>
                  <FormLabel htmlFor="cliente.telefone" mt={4} mb={1}>Telefone</FormLabel>
                  <Input id="cliente.telefone" placeholder="Telefone" {...register('cliente.telefone')} />
                  {errors.cliente?.telefone && (
                    <FormErrorMessage>{errors.cliente.telefone.message}</FormErrorMessage>
                  )}
                </FormControl>
                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.cep}>
                  <FormLabel htmlFor="cliente.endereco.cep" mt={4} mb={1}>CEP</FormLabel>
                  <Input id="cliente.endereco.cep" placeholder="CEP" {...register('cliente.endereco.cep')} onBlur={onBlurCep}/>
                  {errors.cliente?.endereco?.cep && (
                    <FormErrorMessage>{errors.cliente.endereco.cep.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.logradouro}>
                  <FormLabel htmlFor="cliente.endereco.logradouro" mt={4} mb={1}>Logradouro</FormLabel>
                  <Input id="cliente.endereco.logradouro" placeholder="Logradouro" {...register('cliente.endereco.logradouro')} />
                  {errors.cliente?.endereco?.logradouro && (
                    <FormErrorMessage>{errors.cliente.endereco.logradouro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.bairro}>
                  <FormLabel htmlFor="cliente.endereco.bairro" mt={4} mb={1}>Bairro</FormLabel>
                  <Input id="cliente.endereco.bairro" placeholder="Bairro" {...register('cliente.endereco.bairro')} />
                  {errors.cliente?.endereco?.bairro && (
                    <FormErrorMessage>{errors.cliente.endereco.bairro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.cidade}>
                  <FormLabel htmlFor="cliente.endereco.cidade" mt={4} mb={1}>Cidade</FormLabel>
                  <Input id="cliente.endereco.cidade" placeholder="Cidade" {...register('cliente.endereco.cidade')} />
                  {errors.cliente?.endereco?.cidade && (
                    <FormErrorMessage>{errors.cliente.endereco.cidade.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.uf}>
                  <FormLabel htmlFor="cliente.endereco.uf" mt={4} mb={1}>UF</FormLabel>
                  <Input id="cliente.endereco.uf" placeholder="UF" {...register('cliente.endereco.uf')} />
                  {errors.cliente?.endereco?.uf && (
                    <FormErrorMessage>{errors.cliente.endereco.uf.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.cliente?.endereco?.complemento}>
                  <FormLabel htmlFor="cliente.endereco.complemento" mt={4} mb={1}>Complemento</FormLabel>
                  <Input id="cliente.endereco.complemento" placeholder="Complemento" {...register('cliente.endereco.complemento')} />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit(onSubmit)}>
                Salvar
              </Button>
              <Button onClick={onCancel}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  