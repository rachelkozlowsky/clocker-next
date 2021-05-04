import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';

export const formatDate = (date, pattern ) => format(date, pattern, {locale: ptBR } )
