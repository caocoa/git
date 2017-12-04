<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<style>
			table,tr,td{
				border-collapse: collapse;
				border: 1px solid #000;
			}
			td{
				width: 100px;
				height: 20px;
				
			}
			.special{
				height: 30px;
				background: pink;
			}
		</style>
	</head>
	<body>
		<table>
			<?php for($i=0;$i<20;$i++){?>
				<tr <?php if($i%2==1){echo "class='special'";}?>>
					<td>
						<?php
							$a = 'first_cell';
							echo '我是{$a}单元格';
							?>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				
			<?php }?>
		</table>
		
	</body>
</html>
