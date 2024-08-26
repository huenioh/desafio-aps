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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema, FormClientData } from "../schemas/clienteSchema";
import { addClient } from "../controller/clientController"

interface FormCompProps {
  onClientAdded: () => void;
}

export function FormComp({ onClientAdded }: FormCompProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm<FormClientData>({
      resolver: zodResolver(clienteSchema),
    });
  
    const onSubmit = async (data: FormClientData) => {
      try {
        await addClient(data);
        onClose();
        reset();
        onClientAdded();
      } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
      }
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
            setValue('cliente.bairro', cnpjData.estabelecimento.bairro);
            setValue('cliente.cep', cnpjData.estabelecimento.cep);
            setValue('cliente.nomeFantasia', cnpjData.estabelecimento.nome_fantasia);
            setValue('cliente.logradouro', cnpjData.estabelecimento.logradouro);
            setValue('cliente.cidade', cnpjData.estabelecimento.cidade.nome);
            setValue('cliente.email', cnpjData.estabelecimento.email);
            setValue('cliente.uf', cnpjData.estabelecimento.estado.sigla);
            setValue('cliente.complemento', cnpjData.estabelecimento.complemento);
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
      const cep = getValues('cliente.cep');
      
      if (cep) {
        try {
          const respostaAPI = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const cepData = await respostaAPI.json();
    
          if (!cepData.erro) {
            setValue('cliente.bairro', cepData.bairro);
            setValue('cliente.logradouro', cepData.logradouro);
            setValue('cliente.cidade', cepData.localidade);
            setValue('cliente.uf', cepData.uf);
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
            <ModalHeader>Insira os dados do cliente</ModalHeader>
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
                                
                <FormControl isInvalid={!!errors.cliente?.cep}>
                  <FormLabel htmlFor="cliente.cep" mt={4} mb={1}>CEP</FormLabel>
                  <Input id="cliente.cep" placeholder="CEP" {...register('cliente.cep')} onBlur={onBlurCep}/>
                  {errors.cliente?.cep && (
                    <FormErrorMessage>{errors.cliente.cep.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                
                <FormControl isInvalid={!!errors.cliente?.logradouro}>
                  <FormLabel htmlFor="cliente.logradouro" mt={4} mb={1}>Logradouro</FormLabel>
                  <Input id="cliente.logradouro" placeholder="Logradouro" {...register('cliente.logradouro')} />
                  {errors.cliente?.logradouro && (
                    <FormErrorMessage>{errors.cliente.logradouro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.cliente?.bairro}>
                  <FormLabel htmlFor="cliente.bairro" mt={4} mb={1}>Bairro</FormLabel>
                  <Input id="cliente.bairro" placeholder="Bairro" {...register('cliente.bairro')} />
                  {errors.cliente?.bairro && (
                    <FormErrorMessage>{errors.cliente.bairro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.cliente?.cidade}>
                  <FormLabel htmlFor="cliente.cidade" mt={4} mb={1}>Cidade</FormLabel>
                  <Input id="cliente.cidade" placeholder="Cidade" {...register('cliente.cidade')} />
                  {errors.cliente?.cidade && (
                    <FormErrorMessage>{errors.cliente.cidade.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.cliente?.uf}>
                  <FormLabel htmlFor="cliente.uf" mt={4} mb={1}>UF</FormLabel>
                  <Input id="cliente.uf" placeholder="UF" {...register('cliente.uf')} />
                  {errors.cliente?.uf && (
                    <FormErrorMessage>{errors.cliente.uf.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.cliente?.complemento}>
                  <FormLabel htmlFor="cliente.complemento" mt={4} mb={1}>Complemento</FormLabel>
                  <Input id="cliente.complemento" placeholder="Complemento" {...register('cliente.complemento')} />
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
  