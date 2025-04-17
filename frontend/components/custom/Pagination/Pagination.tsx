import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          className="mx-1 bg-indigo-800 hover:bg-indigo-900 text-white"
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
       <MoveLeft/>
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MoveRight/>
      </Button>
    </div>
  );
};

export default CustomPagination;
